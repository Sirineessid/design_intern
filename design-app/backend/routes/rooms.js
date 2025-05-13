const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Room = require('../models/Room');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create a new room
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, scheduledTime } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const room = await Room.create({
      title,
      description,
      scheduledTime: new Date(scheduledTime),
      createdBy: user._id,
      participants: [{
        userId: user._id,
        role: 'host',
        status: 'active'
      }]
    });

    res.status(201).json(room);
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({ message: 'Failed to create room' });
  }
});

// Get all rooms for a user
router.get('/', auth, async (req, res) => {
  try {
    const rooms = await Room.find({
      'participants.userId': req.user.id
    }).populate('participants.userId', 'name email avatar');

    res.json(rooms);
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ message: 'Failed to fetch rooms' });
  }
});

// Get room by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.id })
      .populate('participants.userId', 'name email avatar')
      .populate('createdBy', 'name email avatar');

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json(room);
  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({ message: 'Failed to fetch room' });
  }
});

// Add participants to room
router.post('/:id/participants', auth, async (req, res) => {
  try {
    const { participants } = req.body;
    const room = await Room.findOne({
      roomId: req.params.id,
      'participants.userId': req.user.id,
      'participants.role': 'host'
    });

    if (!room) {
      return res.status(403).json({ message: 'Not authorized to add participants' });
    }

    const participantData = participants.map(email => ({
      userId: null, // Will be updated after finding users
      email,
      role: 'participant',
      status: 'pending'
    }));

    // Find users by email and update participant data
    const users = await User.find({ email: { $in: participants }});
    users.forEach(user => {
      const participant = participantData.find(p => p.email === user.email);
      if (participant) {
        participant.userId = user._id;
      }
    });

    await Room.findByIdAndUpdate(req.params.id, {
      $addToSet: { participants: { $each: participantData }}
    });

    const updatedRoom = await Room.findById(req.params.id)
      .populate('participants.userId', 'name email avatar');

    res.json(updatedRoom);
  } catch (error) {
    console.error('Add participants error:', error);
    res.status(500).json({ message: 'Failed to add participants' });
  }
});

// Remove participant from room
router.delete('/:id/participants/:userId', auth, async (req, res) => {
  try {
    const room = await Room.findOne({
      roomId: req.params.id,
      'participants.userId': req.user.id,
      'participants.role': 'host'
    });

    if (!room) {
      return res.status(403).json({ message: 'Not authorized to remove participants' });
    }

    await Room.findByIdAndUpdate(req.params.id, {
      $pull: { participants: { userId: req.params.userId }}
    });

    res.json({ message: 'Participant removed successfully' });
  } catch (error) {
    console.error('Remove participant error:', error);
    res.status(500).json({ message: 'Failed to remove participant' });
  }
});

module.exports = router; 