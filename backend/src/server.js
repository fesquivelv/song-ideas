require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./db');
require ('./models/index'); // Importa el modelo para que Sequelize lo reconozca


// Import routes
const songIdeasRoutes = require('./routes/songIdeas');
const lyricsRoutes = require('./routes/lyrics');
const recordingsRoutes = require('./routes/recordings');
const authRoutes = require('./routes/auth');


const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // El puerto de tu Frontend en Docker
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/song-ideas', songIdeasRoutes);
app.use('/api/lyrics', lyricsRoutes);
app.use('/api/recordings', recordingsRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

async function startServer() {
  try {
    await sequelize.sync({ alter: true }); // Sincroniza los modelos con la base de datos
    console.log('Database synchronized successfully.');

    app.listen(PORT, () => { 
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
  }
}

// Start server
startServer();