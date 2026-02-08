import 'package:flutter/material.dart';
import '../models/song_idea.dart';
import '../services/database_service.dart';
import '../widgets/chord_sequence_widget.dart';
import '../widgets/lyrics_widget.dart';
import '../widgets/recording_widget.dart';

class SongIdeaDetailScreen extends StatefulWidget {
  final int songIdeaId;

  const SongIdeaDetailScreen({super.key, required this.songIdeaId});

  @override
  State<SongIdeaDetailScreen> createState() => _SongIdeaDetailScreenState();
}

class _SongIdeaDetailScreenState extends State<SongIdeaDetailScreen> {
  final DatabaseService _dbService = DatabaseService.instance;
  SongIdea? _songIdea;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadSongIdea();
  }

  Future<void> _loadSongIdea() async {
    setState(() => _isLoading = true);
    final idea = await _dbService.getSongIdea(widget.songIdeaId);
    setState(() {
      _songIdea = idea;
      _isLoading = false;
    });
  }

  Future<void> _editTitleAndDescription() async {
    if (_songIdea == null) return;

    final titleController = TextEditingController(text: _songIdea!.title);
    final descriptionController =
        TextEditingController(text: _songIdea!.description ?? '');

    final result = await showDialog<Map<String, String>>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Edit Song Idea'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: titleController,
              decoration: const InputDecoration(
                labelText: 'Title',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: descriptionController,
              decoration: const InputDecoration(
                labelText: 'Description',
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, {
              'title': titleController.text.trim(),
              'description': descriptionController.text.trim(),
            }),
            child: const Text('Save'),
          ),
        ],
      ),
    );

    if (result != null && _songIdea != null) {
      final updated = _songIdea!.copyWith(
        title: result['title']!,
        description:
            result['description']!.isEmpty ? null : result['description'],
      );
      await _dbService.updateSongIdea(updated);
      _loadSongIdea();
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(title: const Text('Song Idea')),
        body: const Center(child: CircularProgressIndicator()),
      );
    }

    if (_songIdea == null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Song Idea')),
        body: const Center(child: Text('Song idea not found')),
      );
    }

    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: Text(_songIdea!.title),
          actions: [
            IconButton(
              icon: const Icon(Icons.edit),
              onPressed: _editTitleAndDescription,
            ),
          ],
          bottom: const TabBar(
            tabs: [
              Tab(icon: Icon(Icons.mic), text: 'Recordings'),
              Tab(icon: Icon(Icons.piano), text: 'Chords'),
              Tab(icon: Icon(Icons.text_fields), text: 'Lyrics'),
            ],
          ),
        ),
        body: Column(
          children: [
            if (_songIdea!.description != null)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                color: Theme.of(context).colorScheme.surfaceContainerHighest,
                child: Text(
                  _songIdea!.description!,
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ),
            Expanded(
              child: TabBarView(
                children: [
                  RecordingWidget(
                    songIdea: _songIdea!,
                    onUpdate: _loadSongIdea,
                  ),
                  ChordSequenceWidget(
                    songIdea: _songIdea!,
                    onUpdate: _loadSongIdea,
                  ),
                  LyricsWidget(
                    songIdea: _songIdea!,
                    onUpdate: _loadSongIdea,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
