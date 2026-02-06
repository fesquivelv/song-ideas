const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const songIdeaSchema = new mongoose.Schema({
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
  lyrics: [
    {
      id: String,
      content: String,
      updatedAt: String
    }
  ],
  recordings: [
    {
      id: String,
      name: String,
      description: String,
      url: String,
      createdAt: String,
      updatedAt: String
    }
  ],
  createdAt: {
    type: String,
    default: () => new Date().toISOString()
  },
  updatedAt: {
    type: String,
    default: () => new Date().toISOString()
  }
});

module.exports = mongoose.model('SongIdea', songIdeaSchema);
