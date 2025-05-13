
const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true
  },
  messages: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['text', 'file', 'system'],
      default: 'text'
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  recording: {
    isRecording: {
      type: Boolean,
      default: false
    },
    startTime: Date,
    endTime: Date,
    url: String
  },
  duration: {
    type: Number,
    default: 0
  },
  participants: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    joinTime: Date,
    leaveTime: Date
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Meeting', meetingSchema);
