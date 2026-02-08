import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import '../models/song_idea.dart';

class DatabaseService {
  static final DatabaseService instance = DatabaseService._init();
  static Database? _database;

  DatabaseService._init();

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDB('song_ideas.db');
    return _database!;
  }

  Future<Database> _initDB(String filePath) async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, filePath);

    return await openDatabase(
      path,
      version: 1,
      onCreate: _createDB,
    );
  }

  Future<void> _createDB(Database db, int version) async {
    const idType = 'INTEGER PRIMARY KEY AUTOINCREMENT';
    const textType = 'TEXT NOT NULL';
    const textTypeNullable = 'TEXT';
    const intType = 'INTEGER NOT NULL';
    const intTypeNullable = 'INTEGER';

    // Song Ideas table
    await db.execute('''
      CREATE TABLE song_ideas (
        id $idType,
        title $textType,
        description $textTypeNullable,
        created_at $textType,
        updated_at $textType
      )
    ''');

    // Chord Sequences table
    await db.execute('''
      CREATE TABLE chord_sequences (
        id $idType,
        song_idea_id $intType,
        sequence $textType,
        notes $textTypeNullable,
        created_at $textType,
        FOREIGN KEY (song_idea_id) REFERENCES song_ideas (id) ON DELETE CASCADE
      )
    ''');

    // Lyrics Ideas table
    await db.execute('''
      CREATE TABLE lyrics_ideas (
        id $idType,
        song_idea_id $intType,
        text $textType,
        section $textTypeNullable,
        created_at $textType,
        FOREIGN KEY (song_idea_id) REFERENCES song_ideas (id) ON DELETE CASCADE
      )
    ''');

    // Recordings table
    await db.execute('''
      CREATE TABLE recordings (
        id $idType,
        song_idea_id $intType,
        file_path $textType,
        title $textTypeNullable,
        notes $textTypeNullable,
        duration_seconds $intTypeNullable,
        created_at $textType,
        FOREIGN KEY (song_idea_id) REFERENCES song_ideas (id) ON DELETE CASCADE
      )
    ''');
  }

  // Song Ideas CRUD
  Future<int> createSongIdea(SongIdea songIdea) async {
    final db = await database;
    return await db.insert('song_ideas', songIdea.toMap());
  }

  Future<List<SongIdea>> getAllSongIdeas() async {
    final db = await database;
    final maps = await db.query('song_ideas', orderBy: 'updated_at DESC');
    return maps.map((map) => SongIdea.fromMap(map)).toList();
  }

  Future<SongIdea?> getSongIdea(int id) async {
    final db = await database;
    final maps = await db.query(
      'song_ideas',
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );

    if (maps.isEmpty) return null;
    final songIdea = SongIdea.fromMap(maps.first);

    // Load related data
    final chordSequences = await getChordSequencesForSong(id);
    final lyricsIdeas = await getLyricsIdeasForSong(id);
    final recordings = await getRecordingsForSong(id);

    return songIdea.copyWith(
      chordSequences: chordSequences,
      lyricsIdeas: lyricsIdeas,
      recordings: recordings,
    );
  }

  Future<int> updateSongIdea(SongIdea songIdea) async {
    final db = await database;
    return await db.update(
      'song_ideas',
      songIdea.copyWith(updatedAt: DateTime.now()).toMap(),
      where: 'id = ?',
      whereArgs: [songIdea.id],
    );
  }

  Future<int> deleteSongIdea(int id) async {
    final db = await database;
    return await db.delete('song_ideas', where: 'id = ?', whereArgs: [id]);
  }

  // Chord Sequences CRUD
  Future<int> createChordSequence(ChordSequence chordSequence) async {
    final db = await database;
    final id = await db.insert('chord_sequences', chordSequence.toMap());
    await updateSongIdeaUpdatedTime(chordSequence.songIdeaId);
    return id;
  }

  Future<List<ChordSequence>> getChordSequencesForSong(int songIdeaId) async {
    final db = await database;
    final maps = await db.query(
      'chord_sequences',
      where: 'song_idea_id = ?',
      whereArgs: [songIdeaId],
      orderBy: 'created_at DESC',
    );
    return maps.map((map) => ChordSequence.fromMap(map)).toList();
  }

  Future<int> deleteChordSequence(int id) async {
    final db = await database;
    final maps = await db.query(
      'chord_sequences',
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    if (maps.isEmpty) return 0;
    final chordSequence = ChordSequence.fromMap(maps.first);
    await updateSongIdeaUpdatedTime(chordSequence.songIdeaId);
    return await db.delete('chord_sequences', where: 'id = ?', whereArgs: [id]);
  }

  // Lyrics Ideas CRUD
  Future<int> createLyricsIdea(LyricsIdea lyricsIdea) async {
    final db = await database;
    final id = await db.insert('lyrics_ideas', lyricsIdea.toMap());
    await updateSongIdeaUpdatedTime(lyricsIdea.songIdeaId);
    return id;
  }

  Future<List<LyricsIdea>> getLyricsIdeasForSong(int songIdeaId) async {
    final db = await database;
    final maps = await db.query(
      'lyrics_ideas',
      where: 'song_idea_id = ?',
      whereArgs: [songIdeaId],
      orderBy: 'created_at DESC',
    );
    return maps.map((map) => LyricsIdea.fromMap(map)).toList();
  }

  Future<int> deleteLyricsIdea(int id) async {
    final db = await database;
    final maps = await db.query(
      'lyrics_ideas',
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    if (maps.isEmpty) return 0;
    final lyricsIdea = LyricsIdea.fromMap(maps.first);
    await updateSongIdeaUpdatedTime(lyricsIdea.songIdeaId);
    return await db.delete('lyrics_ideas', where: 'id = ?', whereArgs: [id]);
  }

  // Recordings CRUD
  Future<int> createRecording(Recording recording) async {
    final db = await database;
    final id = await db.insert('recordings', recording.toMap());
    await updateSongIdeaUpdatedTime(recording.songIdeaId);
    return id;
  }

  Future<List<Recording>> getRecordingsForSong(int songIdeaId) async {
    final db = await database;
    final maps = await db.query(
      'recordings',
      where: 'song_idea_id = ?',
      whereArgs: [songIdeaId],
      orderBy: 'created_at DESC',
    );
    return maps.map((map) => Recording.fromMap(map)).toList();
  }

  Future<int> deleteRecording(int id) async {
    final db = await database;
    final maps = await db.query(
      'recordings',
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    if (maps.isEmpty) return 0;
    final recording = Recording.fromMap(maps.first);
    await updateSongIdeaUpdatedTime(recording.songIdeaId);
    return await db.delete('recordings', where: 'id = ?', whereArgs: [id]);
  }

  Future<void> updateSongIdeaUpdatedTime(int songIdeaId) async {
    final db = await database;
    await db.update(
      'song_ideas',
      {'updated_at': DateTime.now().toIso8601String()},
      where: 'id = ?',
      whereArgs: [songIdeaId],
    );
  }

  Future<void> close() async {
    final db = await database;
    await db.close();
  }
}
