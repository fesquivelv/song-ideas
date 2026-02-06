const { v4: uuidv4 } = require('uuid');
const Recording = require('../models/Recording');
const SongIdea = require('../models/SongIdea');
const path = require('path');

// Upload a recording
exports.uploadRecording = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No audio file provided' });
    }

    const { name, description, ideaId } = req.body;

    if (!name || !ideaId) {
      return res.status(400).json({ message: 'Recording name and ideaId are required' });
    }

    // Verify song idea exists
    const songIdea = await SongIdea.findOne({ id: ideaId });
    if (!songIdea) {
      return res.status(404).json({ message: 'Song idea not found' });
    }

    // Create recording document
    const newRecording = new Recording({
      id: uuidv4(),
      name,
      description: description || '',
      ideaId,
      url: `/uploads/${req.file.filename}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    await newRecording.save();

    // Add recording to song idea
    songIdea.recordings.push({
      id: newRecording.id,
      name: newRecording.name,
      description: newRecording.description,
      url: newRecording.url,
      createdAt: newRecording.createdAt,
      updatedAt: newRecording.updatedAt
    });
    songIdea.updatedAt = new Date().toISOString();
    await songIdea.save();

    res.status(201).json({
      message: 'Recording uploaded successfully',
      recording: newRecording
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading recording', error: error.message });
  }
};

// Get all recordings for a song idea
exports.getRecordingsByIdeaId = async (req, res) => {
  try {
    const { ideaId } = req.params;

    const recordings = await Recording.find({ ideaId });
    res.status(200).json(recordings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recordings', error: error.message });
  }
};

// Get a single recording
exports.getRecordingById = async (req, res) => {
  try {
    const { id } = req.params;

    const recording = await Recording.findOne({ id });

    if (!recording) {
      return res.status(404).json({ message: 'Recording not found' });
    }

    res.status(200).json(recording);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recording', error: error.message });
  }
};

// Update recording metadata
exports.updateRecording = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const recording = await Recording.findOne({ id });

    if (!recording) {
      return res.status(404).json({ message: 'Recording not found' });
    }

    if (name) recording.name = name;
    if (description !== undefined) recording.description = description;
    recording.updatedAt = new Date().toISOString();

    await recording.save();

    // Update in song idea
    const songIdea = await SongIdea.findOne({ id: recording.ideaId });
    if (songIdea) {
      const recordingIndex = songIdea.recordings.findIndex(r => r.id === id);
      if (recordingIndex > -1) {
        songIdea.recordings[recordingIndex] = {
          id: recording.id,
          name: recording.name,
          description: recording.description,
          url: recording.url,
          createdAt: recording.createdAt,
          updatedAt: recording.updatedAt
        };
        await songIdea.save();
      }
    }

    res.status(200).json(recording);
  } catch (error) {
    res.status(500).json({ message: 'Error updating recording', error: error.message });
  }
};

// Delete recording
exports.deleteRecording = async (req, res) => {
  try {
    const { id } = req.params;

    const recording = await Recording.findOneAndDelete({ id });

    if (!recording) {
      return res.status(404).json({ message: 'Recording not found' });
    }

    // Remove from song idea
    const songIdea = await SongIdea.findOne({ id: recording.ideaId });
    if (songIdea) {
      songIdea.recordings = songIdea.recordings.filter(r => r.id !== id);
      songIdea.updatedAt = new Date().toISOString();
      await songIdea.save();
    }

    res.status(200).json({ message: 'Recording deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recording', error: error.message });
  }
};
