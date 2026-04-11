const Lyrics = require('../models/Lyrics');

const createLyrics = async (req, res) => {
    try { 
        const { title, content, ideaId } = req.body;
        const newLyrics = await Lyrics.create({ title, content, ideaId });
        res.status(201).json(newLyrics);
    } catch (error) {
        console.error('Error creating lyrics:', error);
        res.status(500).json({ message: 'Error creating lyrics', error: error.message });

    }
};

module.exports = {
    createLyrics
};