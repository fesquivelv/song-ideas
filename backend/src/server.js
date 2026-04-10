require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const songIdeasRoutes = require('./routes/songIdeas');

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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
