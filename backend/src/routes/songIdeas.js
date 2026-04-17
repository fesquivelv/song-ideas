const express = require('express');
const router = express.Router();
const songIdeasController = require('../controllers/songIdeasController');
const authMiddleware = require('../middleware/authMiddleware');
// Apply authentication middleware to all routes in this router
router.use(authMiddleware);

// Get all song ideas
router.get('/', songIdeasController.getAllSongIdeas);

// Get a single song idea
router.get('/:id', songIdeasController.getSongIdeaById);

// Create a new song idea
router.post('/', songIdeasController.createSongIdea);

module.exports = router;
