
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Update to your frontend origin in production
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // When user joins a room
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', userId);
    console.log(`${userId} joined room ${roomId}`);
  });

  // Forward offer
  socket.on('offer', ({ targetId, offer, callerId }) => {
    io.to(targetId).emit('offer', { offer, callerId });
  });

  // Forward answer
  socket.on('answer', ({ targetId, answer }) => {
    io.to(targetId).emit('answer', { answer });
  });

  // Forward ICE candidate
  socket.on('ice-candidate', ({ targetId, candidate }) => {
    io.to(targetId).emit('ice-candidate', { candidate });
  });

  // When user disconnects
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    socket.broadcast.emit('user-disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Signaling server running on port ${PORT}`));
