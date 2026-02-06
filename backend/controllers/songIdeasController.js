const { v4: uuidv4 } = require('uuid');
const SongIdea = require('../models/SongIdea');
const Recording = require('../models/Recording');

// Get all song ideas
exports.getAllSongIdeas = async (req, res) => {
  try {
    const songIdeas = await SongIdea.find();
    res.status(200).json(songIdeas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching song ideas', error: error.message });
  }
};

// Get a single song idea by ID
exports.getSongIdeaById = async (req, res) => {
  try {
    const { id } = req.params;
    const songIdea = await SongIdea.findOne({ id });

    if (!songIdea) {
      return res.status(404).json({ message: 'Song idea not found' });
    }

    res.status(200).json(songIdea);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching song idea', error: error.message });
  }
};

// Create a new song idea
exports.createSongIdea = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Song name is required' });
    }

    const newSongIdea = new SongIdea({
      id: uuidv4(),
      name,
      description: description || '',
      lyrics: [],
      recordings: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    await newSongIdea.save();
    res.status(201).json(newSongIdea);
  } catch (error) {
    res.status(500).json({ message: 'Error creating song idea', error: error.message });
  }
};

// Update a song idea
exports.updateSongIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const songIdea = await SongIdea.findOne({ id });

    if (!songIdea) {
      return res.status(404).json({ message: 'Song idea not found' });
    }

    if (name) songIdea.name = name;
    if (description !== undefined) songIdea.description = description;
    songIdea.updatedAt = new Date().toISOString();

    await songIdea.save();
    res.status(200).json(songIdea);
  } catch (error) {
    res.status(500).json({ message: 'Error updating song idea', error: error.message });
  }
};

// Delete a song idea
exports.deleteSongIdea = async (req, res) => {
  try {
    const { id } = req.params;

    const songIdea = await SongIdea.findOneAndDelete({ id });

    if (!songIdea) {
      return res.status(404).json({ message: 'Song idea not found' });
    }

    // Delete associated recordings
    await Recording.deleteMany({ ideaId: id });

    res.status(200).json({ message: 'Song idea deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting song idea', error: error.message });
  }
};
