const { v4: uuidv4 } = require('uuid');
const Lyrics = require('../models/Lyrics');
const SongIdea = require('../models/SongIdea');

// Create new lyrics
exports.createLyrics = async (req, res) => {
  try {
    const { content, ideaId } = req.body;

    if (!content || !ideaId) {
      return res.status(400).json({ message: 'Content and ideaId are required' });
    }

    // Verify song idea exists
    const songIdea = await SongIdea.findOne({ id: ideaId });
    if (!songIdea) {
      return res.status(404).json({ message: 'Song idea not found' });
    }

    const newLyrics = new Lyrics({
      id: uuidv4(),
      content,
      ideaId,
      updatedAt: new Date().toISOString()
    });

    await newLyrics.save();

    // Add lyrics to song idea
    songIdea.lyrics.push({
      id: newLyrics.id,
      content: newLyrics.content,
      updatedAt: newLyrics.updatedAt
    });
    songIdea.updatedAt = new Date().toISOString();
    await songIdea.save();

    res.status(201).json(newLyrics);
  } catch (error) {
    res.status(500).json({ message: 'Error creating lyrics', error: error.message });
  }
};

// Get all lyrics for a song idea
exports.getLyricsByIdeaId = async (req, res) => {
  try {
    const { ideaId } = req.params;

    const lyrics = await Lyrics.find({ ideaId });
    res.status(200).json(lyrics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lyrics', error: error.message });
  }
};

// Get a single lyric
exports.getLyricsById = async (req, res) => {
  try {
    const { id } = req.params;

    const lyrics = await Lyrics.findOne({ id });

    if (!lyrics) {
      return res.status(404).json({ message: 'Lyrics not found' });
    }

    res.status(200).json(lyrics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lyrics', error: error.message });
  }
};

// Update lyrics
exports.updateLyrics = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const lyrics = await Lyrics.findOne({ id });

    if (!lyrics) {
      return res.status(404).json({ message: 'Lyrics not found' });
    }

    lyrics.content = content;
    lyrics.updatedAt = new Date().toISOString();

    await lyrics.save();

    // Update in song idea
    const songIdea = await SongIdea.findOne({ id: lyrics.ideaId });
    if (songIdea) {
      const lyricsIndex = songIdea.lyrics.findIndex(l => l.id === id);
      if (lyricsIndex > -1) {
        songIdea.lyrics[lyricsIndex] = {
          id: lyrics.id,
          content: lyrics.content,
          updatedAt: lyrics.updatedAt
        };
        await songIdea.save();
      }
    }

    res.status(200).json(lyrics);
  } catch (error) {
    res.status(500).json({ message: 'Error updating lyrics', error: error.message });
  }
};

// Delete lyrics
exports.deleteLyrics = async (req, res) => {
  try {
    const { id } = req.params;

    const lyrics = await Lyrics.findOneAndDelete({ id });

    if (!lyrics) {
      return res.status(404).json({ message: 'Lyrics not found' });
    }

    // Remove from song idea
    const songIdea = await SongIdea.findOne({ id: lyrics.ideaId });
    if (songIdea) {
      songIdea.lyrics = songIdea.lyrics.filter(l => l.id !== id);
      songIdea.updatedAt = new Date().toISOString();
      await songIdea.save();
    }

    res.status(200).json({ message: 'Lyrics deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lyrics', error: error.message });
  }
};
