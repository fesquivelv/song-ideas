const express = require('express');
const router = express.Router();
const lyricsController = require('../controllers/lyricsController');    

// Create new lyrics
router.post('/', lyricsController.createLyrics);

module.exports = router;