const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const recordingSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  ideaId: {
    type: String,
    required: true,
    ref: 'SongIdea'
  },
  url: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    default: () => new Date().toISOString()
  },
  updatedAt: {
    type: String,
    default: () => new Date().toISOString()
  }
});

module.exports = mongoose.model('Recording', recordingSchema);
