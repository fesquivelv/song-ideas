const express = require('express');
const router = express.Router();
const songIdeasController = require('../controllers/songIdeasController');

// Get all song ideas
router.get('/', songIdeasController.getAllSongIdeas);

// Get a single song idea
router.get('/:id', songIdeasController.getSongIdeaById);

// Create a new song idea
router.post('/', songIdeasController.createSongIdea);

// Update a song idea
router.put('/:id', songIdeasController.updateSongIdea);

// Delete a song idea
router.delete('/:id', songIdeasController.deleteSongIdea);

module.exports = router;
