
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const User = require('./models/User');
const Room = require('./models/Room');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors({
  origin: ['http://localhost:8081', 'http://localhost:8083'],
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true,
}

));
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/video-chat';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// CORS settings for React frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Use auth routes
app.use('/api/auth', authRoutes);

// Socket.IO initialization
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8083',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Store active rooms and users
const rooms = new Map();
const activeUsers = new Map();

// WebRTC Signaling & Room Management
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on('joinRoom', async (roomId, user) => {
    try {
      if (!user || !user.email) {
        throw new Error('Invalid user data');
      }

      socket.join(roomId);
      activeUsers.set(socket.id, { ...user, socketId: socket.id });

      // Get room participants
      const roomParticipants = Array.from(io.sockets.adapter.rooms.get(roomId) || [])
        .map(socketId => activeUsers.get(socketId))
        .filter(Boolean);

      // Notify others
      socket.to(roomId).emit('userJoined', user);
      
      // Send room info to the joining user
      socket.emit('roomInfo', {
        participants: roomParticipants,
        messages: rooms.get(roomId)?.messages || []
      });

    } catch (error) {
      console.error('Error joining room:', error);
      socket.emit('error', { message: 'Failed to join room' });
    }
  });

  socket.on('chatMessage', ({ roomId, message }) => {
    try {
      if (!rooms.has(roomId)) {
        rooms.set(roomId, { messages: [] });
      }
      
      const roomData = rooms.get(roomId);
      roomData.messages.push(message);
      
      io.to(roomId).emit('newMessage', message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  socket.on('typing', ({ roomId, user }) => {
    socket.to(roomId).emit('userTyping', user);
  });

  socket.on('stopTyping', ({ roomId, user }) => {
    socket.to(roomId).emit('userStoppedTyping', user);
  });

  // Forward WebRTC offers
  socket.on('offer', (data) => {
    io.to(data.roomId).emit('offer', data);
  });

  // Forward WebRTC answers
  socket.on('answer', (data) => {
    io.to(data.roomId).emit('answer', data);
  });

  // Forward ICE candidates
  socket.on('candidate', (data) => {
    io.to(data.roomId).emit('candidate', data);
  });

  // Update user status (e.g., mute, video, screen sharing)
  socket.on('userStatusUpdate', async (roomId, userId, status) => {
    try {
      const room = await Room.findOne({ roomId });
      if (room && room.participants.some(p => p.userId === userId)) {
        // Update the user's status
        room.participants = room.participants.map(p =>
          p.userId === userId ? { ...p, ...status } : p
        );

        await room.save();

        // Broadcast updated participants list
        io.to(roomId).emit('updateParticipants', room.participants);
      }
    } catch (err) {
      console.error('❌ Error updating user status:', err);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      // Notify all rooms this user was in
      socket.rooms.forEach(roomId => {
        if (roomId !== socket.id) {
          io.to(roomId).emit('userLeft', socket.id);
        }
      });
      activeUsers.delete(socket.id);
    }
    console.log('❌ User disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
