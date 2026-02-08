class SongIdea {
  final int? id;
  final String title;
  final String? description;
  final DateTime createdAt;
  final DateTime updatedAt;
  final List<ChordSequence> chordSequences;
  final List<LyricsIdea> lyricsIdeas;
  final List<Recording> recordings;

  SongIdea({
    this.id,
    required this.title,
    this.description,
    required this.createdAt,
    required this.updatedAt,
    this.chordSequences = const [],
    this.lyricsIdeas = const [],
    this.recordings = const [],
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }

  factory SongIdea.fromMap(Map<String, dynamic> map) {
    return SongIdea(
      id: map['id'] as int?,
      title: map['title'] as String,
      description: map['description'] as String?,
      createdAt: DateTime.parse(map['created_at'] as String),
      updatedAt: DateTime.parse(map['updated_at'] as String),
    );
  }

  SongIdea copyWith({
    int? id,
    String? title,
    String? description,
    DateTime? createdAt,
    DateTime? updatedAt,
    List<ChordSequence>? chordSequences,
    List<LyricsIdea>? lyricsIdeas,
    List<Recording>? recordings,
  }) {
    return SongIdea(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      chordSequences: chordSequences ?? this.chordSequences,
      lyricsIdeas: lyricsIdeas ?? this.lyricsIdeas,
      recordings: recordings ?? this.recordings,
    );
  }
}

class ChordSequence {
  final int? id;
  final int songIdeaId;
  final String sequence;
  final String? notes;
  final DateTime createdAt;

  ChordSequence({
    this.id,
    required this.songIdeaId,
    required this.sequence,
    this.notes,
    required this.createdAt,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'song_idea_id': songIdeaId,
      'sequence': sequence,
      'notes': notes,
      'created_at': createdAt.toIso8601String(),
    };
  }

  factory ChordSequence.fromMap(Map<String, dynamic> map) {
    return ChordSequence(
      id: map['id'] as int?,
      songIdeaId: map['song_idea_id'] as int,
      sequence: map['sequence'] as String,
      notes: map['notes'] as String?,
      createdAt: DateTime.parse(map['created_at'] as String),
    );
  }
}

class LyricsIdea {
  final int? id;
  final int songIdeaId;
  final String text;
  final String? section; // e.g., "Verse 1", "Chorus", "Bridge"
  final DateTime createdAt;

  LyricsIdea({
    this.id,
    required this.songIdeaId,
    required this.text,
    this.section,
    required this.createdAt,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'song_idea_id': songIdeaId,
      'text': text,
      'section': section,
      'created_at': createdAt.toIso8601String(),
    };
  }

  factory LyricsIdea.fromMap(Map<String, dynamic> map) {
    return LyricsIdea(
      id: map['id'] as int?,
      songIdeaId: map['song_idea_id'] as int,
      text: map['text'] as String,
      section: map['section'] as String?,
      createdAt: DateTime.parse(map['created_at'] as String),
    );
  }
}

class Recording {
  final int? id;
  final int songIdeaId;
  final String filePath;
  final String? title;
  final String? notes;
  final int? durationSeconds;
  final DateTime createdAt;

  Recording({
    this.id,
    required this.songIdeaId,
    required this.filePath,
    this.title,
    this.notes,
    this.durationSeconds,
    required this.createdAt,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'song_idea_id': songIdeaId,
      'file_path': filePath,
      'title': title,
      'notes': notes,
      'duration_seconds': durationSeconds,
      'created_at': createdAt.toIso8601String(),
    };
  }

  factory Recording.fromMap(Map<String, dynamic> map) {
    return Recording(
      id: map['id'] as int?,
      songIdeaId: map['song_idea_id'] as int,
      filePath: map['file_path'] as String,
      title: map['title'] as String?,
      notes: map['notes'] as String?,
      durationSeconds: map['duration_seconds'] as int?,
      createdAt: DateTime.parse(map['created_at'] as String),
    );
  }
}
