// backend/routes/meetingRoutes.js
const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');

// Create a new meeting
router.post('/create', async (req, res) => {
  const { roomId, host, password } = req.body;
  const meeting = new Meeting({ roomId, host, participants: [host], password });
  await meeting.save();
  res.json(meeting);
});

// Join a meeting
router.post('/join', async (req, res) => {
  const { roomId, email } = req.body;
  const meeting = await Meeting.findOne({ roomId });
  if (meeting && !meeting.participants.includes(email)) {
    meeting.participants.push(email);
    await meeting.save();
    res.json(meeting);
  } else {
    res.status(400).json({ error: 'Invalid room or user' });
  }
});

module.exports = router;
