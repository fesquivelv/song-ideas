const express = require('express');
const router = express.Router();
const lyricsController = require('../controllers/lyricsController');   
const authMiddleware = require('../middleware/authMiddleware');
// Apply authentication middleware to all routes in this router
router.use(authMiddleware); 

// Create new lyrics
router.post('/', lyricsController.createLyrics);

module.exports = router;