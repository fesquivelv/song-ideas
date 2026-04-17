const Recording = require('../models/Recording');
const SongIdea = require('../models/SongIdea');

const uploadRecording = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { name, description, ideaId } = req.body;

        if (!name || !description || !ideaId) {
            return res
                .status(400)
                .json({
                    message:
                        'Missing required fields: name, description, ideaId',
                });
        }

        const songIdea = await SongIdea.findByPk(ideaId);
        if (!songIdea) {
            return res.status(404).json({ message: 'Song idea not found' });
        }

        const newRecording = await Recording.create({
            name,
            description,
            ideaId,
            url: `/uploads/${req.file.filename}`,
        });
        res.status(201).json(newRecording);
    } catch (error) {
        res.status(500).json({ message: 'Error uploading recording', error });
    }
};

module.exports = {
    uploadRecording,
};
