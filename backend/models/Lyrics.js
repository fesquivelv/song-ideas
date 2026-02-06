const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const lyricsSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  ideaId: {
    type: String,
    required: true,
    ref: 'SongIdea'
  },
  updatedAt: {
    type: String,
    default: () => new Date().toISOString()
  }
});

module.exports = mongoose.model('Lyrics', lyricsSchema);
