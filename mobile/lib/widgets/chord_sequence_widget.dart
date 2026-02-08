import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/song_idea.dart';
import '../services/database_service.dart';

class ChordSequenceWidget extends StatefulWidget {
  final SongIdea songIdea;
  final VoidCallback onUpdate;

  const ChordSequenceWidget({
    super.key,
    required this.songIdea,
    required this.onUpdate,
  });

  @override
  State<ChordSequenceWidget> createState() => _ChordSequenceWidgetState();
}

class _ChordSequenceWidgetState extends State<ChordSequenceWidget> {
  final DatabaseService _dbService = DatabaseService.instance;

  Future<void> _addChordSequence() async {
    final sequenceController = TextEditingController();
    final notesController = TextEditingController();

    final result = await showDialog<Map<String, String>>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add Chord Sequence'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: sequenceController,
              decoration: const InputDecoration(
                labelText: 'Chord Sequence *',
                hintText: 'e.g., C - Am - F - G',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: notesController,
              decoration: const InputDecoration(
                labelText: 'Notes (optional)',
                hintText: 'Add any notes about this sequence...',
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
            onPressed: () {
              if (sequenceController.text.trim().isNotEmpty) {
                Navigator.pop(context, {
                  'sequence': sequenceController.text.trim(),
                  'notes': notesController.text.trim(),
                });
              }
            },
            child: const Text('Add'),
          ),
        ],
      ),
    );

    if (result != null) {
      final chordSequence = ChordSequence(
        songIdeaId: widget.songIdea.id!,
        sequence: result['sequence']!,
        notes: result['notes']!.isEmpty ? null : result['notes'],
        createdAt: DateTime.now(),
      );

      await _dbService.createChordSequence(chordSequence);
      widget.onUpdate();
    }
  }

  Future<void> _deleteChordSequence(ChordSequence chordSequence) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Chord Sequence'),
        content: const Text(
            'Are you sure you want to delete this chord sequence?'),
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
      await _dbService.deleteChordSequence(chordSequence.id!);
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
            onPressed: _addChordSequence,
            icon: const Icon(Icons.add),
            label: const Text('Add Chord Sequence'),
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
            ),
          ),
        ),
        Expanded(
          child: widget.songIdea.chordSequences.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.piano, size: 64, color: Colors.grey[400]),
                      const SizedBox(height: 16),
                      Text(
                        'No chord sequences yet',
                        style: TextStyle(color: Colors.grey[600]),
                      ),
                    ],
                  ),
                )
              : ListView.builder(
                  itemCount: widget.songIdea.chordSequences.length,
                  itemBuilder: (context, index) {
                    final chordSequence =
                        widget.songIdea.chordSequences[index];

                    return Card(
                      margin: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      child: ListTile(
                        leading: CircleAvatar(
                          backgroundColor:
                              Theme.of(context).colorScheme.secondaryContainer,
                          child: Icon(
                            Icons.music_note,
                            color: Theme.of(context)
                                .colorScheme
                                .onSecondaryContainer,
                          ),
                        ),
                        title: Text(
                          chordSequence.sequence,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            if (chordSequence.notes != null) ...[
                              const SizedBox(height: 4),
                              Text(chordSequence.notes!),
                            ],
                            const SizedBox(height: 4),
                            Text(
                              DateFormat('MMM d, y • h:mm a')
                                  .format(chordSequence.createdAt),
                              style: TextStyle(
                                fontSize: 12,
                                color: Colors.grey[600],
                              ),
                            ),
                          ],
                        ),
                        trailing: IconButton(
                          icon: const Icon(Icons.delete, color: Colors.red),
                          onPressed: () =>
                              _deleteChordSequence(chordSequence),
                        ),
                      ),
                    );
                  },
                ),
        ),
      ],
    );
  }
}
