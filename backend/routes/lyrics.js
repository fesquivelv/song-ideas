const express = require('express');
const router = express.Router();
const lyricsController = require('../controllers/lyricsController');

// Create new lyrics
router.post('/', lyricsController.createLyrics);

// Get all lyrics for a song idea
router.get('/idea/:ideaId', lyricsController.getLyricsByIdeaId);

// Get a single lyric
router.get('/:id', lyricsController.getLyricsById);

// Update lyrics
router.put('/:id', lyricsController.updateLyrics);

// Delete lyrics
router.delete('/:id', lyricsController.deleteLyrics);

module.exports = router;
