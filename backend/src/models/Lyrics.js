const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Lyrics = sequelize.define('Lyrics', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ideaId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'song_ideas',
      key: 'id'
    }
  }
}, {
  tableName: 'lyrics',
  timestamps: true
});

module.exports = Lyrics;


