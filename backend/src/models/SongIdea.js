const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const SongIdea = sequelize.define('SongIdea', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: ''
  }
}, {
  tableName: 'song_ideas',
  timestamps: true
});

module.exports = SongIdea;

