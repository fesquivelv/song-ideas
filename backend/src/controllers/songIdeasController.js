const SongIdea = require('../models/SongIdea');
const Recording = require('../models/Recording');
const Lyrics = require('../models/Lyrics');


// Get all song ideas
const getAllSongIdeas = async (req, res) => {
    console.log('User ID from token:', req.user); // Agregar un log para verificar el ID del usuario
    try {
        const songIdeas = await SongIdea.findAll({
            where: { userId: req.user.userId }, // Filtrar por el ID del usuario autenticado
            include: [
                {
                    model: Recording, as: 'recordings'
                },
                {
                    model: Lyrics, as: 'lyrics'
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        console.log('Fetched song ideas:', songIdeas);
        res.status(200).json(songIdeas);    

    } catch (error) {
        console.error('Error fetching song ideas:', error);
        res.status(500).json({ message: 'Error fetching song ideas', error: error.message });
    }
};

// Get a single song idea by ID
 const getSongIdeaById = async (req, res) => {
    try {
        const { id } = req.params;
        const songIdea = await SongIdea.findByPk(id, {
            include: [
                {
                    model: Recording, as: 'recordings'
                },
                {
                    model: Lyrics, as: 'lyrics'
                }
            ]
        });

        if (!songIdea) {
            return res.status(404).json({ message: 'Song idea not found' });
        }   
        res.status(200).json(songIdea);
    } catch (error) {
        console.error('Error fetching song idea:', error);
        res.status(500).json({ message: 'Error fetching song idea', error: error.message });
    }
};

// Create a new song idea
 const createSongIdea = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newSongIdea = await SongIdea.create({ name, description, userId: req.user.userId });
        res.status(201).json(newSongIdea);
    } catch (error) {
        console.error('Error creating song idea:', error);
        res.status(500).json({ message: 'Error creating song idea', error: error.message });
    }
};


module.exports = {
    getAllSongIdeas,
    getSongIdeaById,
    createSongIdea
};


