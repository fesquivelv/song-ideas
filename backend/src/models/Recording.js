const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Recording = sequelize.define('Recording', {
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
  },
  chords: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ideaId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'song_ideas',
      key: 'id'
    }
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'recordings',
  timestamps: true
});

module.exports = Recording;

