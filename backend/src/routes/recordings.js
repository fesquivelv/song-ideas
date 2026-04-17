const express = require('express');
const router = express.Router();
const recordingController = require('../controllers/recordingController');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
// Apply authentication middleware to all routes in this router
router.use(authMiddleware);

// Route to upload a recording
router.post(
    '/upload',
    upload.single('audio'),
    recordingController.uploadRecording,
);

module.exports = router;
