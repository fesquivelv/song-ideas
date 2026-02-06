const express = require('express');
const router = express.Router();
const recordingsController = require('../controllers/recordingsController');
const upload = require('../middleware/uploadMiddleware');

// Upload a recording
router.post('/upload', upload.single('audio'), recordingsController.uploadRecording);

// Get all recordings for a song idea
router.get('/idea/:ideaId', recordingsController.getRecordingsByIdeaId);

// Get a single recording
router.get('/:id', recordingsController.getRecordingById);

// Update recording metadata
router.put('/:id', recordingsController.updateRecording);

// Delete recording
router.delete('/:id', recordingsController.deleteRecording);

module.exports = router;
