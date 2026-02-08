import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/song_idea.dart';
import '../services/database_service.dart';

class LyricsWidget extends StatefulWidget {
  final SongIdea songIdea;
  final VoidCallback onUpdate;

  const LyricsWidget({
    super.key,
    required this.songIdea,
    required this.onUpdate,
  });

  @override
  State<LyricsWidget> createState() => _LyricsWidgetState();
}

class _LyricsWidgetState extends State<LyricsWidget> {
  final DatabaseService _dbService = DatabaseService.instance;

  Future<void> _addLyrics() async {
    final textController = TextEditingController();
    final sectionController = TextEditingController();

    final result = await showDialog<Map<String, String>>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add Lyrics'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: sectionController,
              decoration: const InputDecoration(
                labelText: 'Section (optional)',
                hintText: 'e.g., Verse 1, Chorus, Bridge',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: textController,
              decoration: const InputDecoration(
                labelText: 'Lyrics *',
                hintText: 'Enter your lyrics...',
                border: OutlineInputBorder(),
                alignLabelWithHint: true,
              ),
              maxLines: 8,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              if (textController.text.trim().isNotEmpty) {
                Navigator.pop(context, {
                  'text': textController.text.trim(),
                  'section': sectionController.text.trim(),
                });
              }
            },
            child: const Text('Add'),
          ),
        ],
      ),
    );

    if (result != null) {
      final lyricsIdea = LyricsIdea(
        songIdeaId: widget.songIdea.id!,
        text: result['text']!,
        section: result['section']!.isEmpty ? null : result['section'],
        createdAt: DateTime.now(),
      );

      await _dbService.createLyricsIdea(lyricsIdea);
      widget.onUpdate();
    }
  }

  Future<void> _deleteLyrics(LyricsIdea lyricsIdea) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Lyrics'),
        content: const Text('Are you sure you want to delete this lyrics?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            style: TextButton.styleFrom(foregroundColor: Colors.red),
            child: const Text('Delete'),
          ),
        ],
      ),
    );

    if (confirmed == true) {
      await _dbService.deleteLyricsIdea(lyricsIdea.id!);
      widget.onUpdate();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(16),
          child: ElevatedButton.icon(
            onPressed: _addLyrics,
            icon: const Icon(Icons.add),
            label: const Text('Add Lyrics'),
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
            ),
          ),
        ),
        Expanded(
          child: widget.songIdea.lyricsIdeas.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.text_fields, size: 64, color: Colors.grey[400]),
                      const SizedBox(height: 16),
                      Text(
                        'No lyrics yet',
                        style: TextStyle(color: Colors.grey[600]),
                      ),
                    ],
                  ),
                )
              : ListView.builder(
                  itemCount: widget.songIdea.lyricsIdeas.length,
                  itemBuilder: (context, index) {
                    final lyricsIdea = widget.songIdea.lyricsIdeas[index];

                    return Card(
                      margin: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      child: ListTile(
                        leading: CircleAvatar(
                          backgroundColor:
                              Theme.of(context).colorScheme.tertiaryContainer,
                          child: Icon(
                            Icons.text_fields,
                            color: Theme.of(context)
                                .colorScheme
                                .onTertiaryContainer,
                          ),
                        ),
                        title: Text(
                          lyricsIdea.section ?? 'Lyrics',
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const SizedBox(height: 8),
                            Text(
                              lyricsIdea.text,
                              style: const TextStyle(fontSize: 14),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              DateFormat('MMM d, y • h:mm a')
                                  .format(lyricsIdea.createdAt),
                              style: TextStyle(
                                fontSize: 12,
                                color: Colors.grey[600],
                              ),
                            ),
                          ],
                        ),
                        trailing: IconButton(
                          icon: const Icon(Icons.delete, color: Colors.red),
                          onPressed: () => _deleteLyrics(lyricsIdea),
                        ),
                        isThreeLine: true,
                      ),
                    );
                  },
                ),
        ),
      ],
    );
  }
}
