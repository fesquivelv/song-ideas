const SongIdea = require('./SongIdea');
const Recording = require('./Recording');
const Lyrics = require('./Lyrics');
const User = require('./User');

User.hasMany(SongIdea, { foreignKey: 'userId', as: 'songIdeas' });
SongIdea.belongsTo(User, { foreignKey: 'userId', as: 'user' });

SongIdea.hasMany(Recording, { foreignKey: 'ideaId', as: 'recordings' });
Recording.belongsTo(SongIdea, { foreignKey: 'ideaId', as: 'songIdea' });

SongIdea.hasMany(Lyrics, { foreignKey: 'ideaId', as: 'lyrics' });
Lyrics.belongsTo(SongIdea, { foreignKey: 'ideaId', as: 'songIdea' });

module.exports = {
  SongIdea,
  Recording,
  Lyrics,
  User
};