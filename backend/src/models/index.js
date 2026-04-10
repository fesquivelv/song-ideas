const SongIdea = require('./SongIdea');
const Recording = require('./Recording');
const Lyrics = require('./Lyrics');

SongIdea.hasMany(Recording, { foreignKey: 'song_idea_id', as: 'recordings' });
Recording.belongsTo(SongIdea, { foreignKey: 'song_idea_id', as: 'songIdea' });

SongIdea.hasMany(Lyrics, { foreignKey: 'ideaId', as: 'lyrics' });
Lyrics.belongsTo(SongIdea, { foreignKey: 'ideaId', as: 'songIdea' });

module.exports = {
  SongIdea,
  Recording,
  Lyrics
};