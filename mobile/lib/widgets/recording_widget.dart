import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:song_ideas_app/widgets/player_widget.dart';
import '../models/song_idea.dart';
import '../services/database_service.dart';
import '../services/recording_service.dart';

class RecordingWidget extends StatefulWidget {
  final SongIdea songIdea;
  final VoidCallback onUpdate;

  const RecordingWidget({
    super.key,
    required this.songIdea,
    required this.onUpdate,
  });

  @override
  State<RecordingWidget> createState() => _RecordingWidgetState();
}

class _RecordingWidgetState extends State<RecordingWidget> {
  final DatabaseService _dbService = DatabaseService.instance;
  final RecordingService _recordingService = RecordingService();

  bool _isRecording = false;
  String? _currentRecordingPath;
  int _recordingDuration = 0;

  @override
  void dispose() {
    _recordingService.dispose();
    super.dispose();
  }

  Future<void> _startRecording() async {
    try {
      final path = await _recordingService.startRecording();
      if (path != null) {
        setState(() {
          _isRecording = true;
          _currentRecordingPath = path;
          _recordingDuration = 0;
        });

        // Update duration every second
        while (_isRecording && mounted) {
          await Future.delayed(const Duration(seconds: 1));
          if (_isRecording && mounted) {
            setState(() => _recordingDuration++);
          }
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error starting recording: $e')),
        );
      }
    }
  }

  Future<void> _stopRecording() async {
    final path = await _recordingService.stopRecording();
    setState(() => _isRecording = false);

    if (path != null && _currentRecordingPath != null) {
      await _saveRecording(_currentRecordingPath!, _recordingDuration);
      setState(() {
        _currentRecordingPath = null;
        _recordingDuration = 0;
      });
    }
  }

  Future<void> _saveRecording(String filePath, int duration) async {
    final titleController = TextEditingController();
    final notesController = TextEditingController();

    final result = await showDialog<Map<String, String>>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Save Recording'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: titleController,
              decoration: const InputDecoration(
                labelText: 'Title (optional)',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: notesController,
              decoration: const InputDecoration(
                labelText: 'Notes (optional)',
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
              'notes': notesController.text.trim(),
            }),
            child: const Text('Save'),
          ),
        ],
      ),
    );

    if (result != null) {
      final recording = Recording(
        songIdeaId: widget.songIdea.id!,
        filePath: filePath,
        title: result['title']!.isEmpty ? null : result['title'],
        notes: result['notes']!.isEmpty ? null : result['notes'],
        durationSeconds: duration,
        createdAt: DateTime.now(),
      );

      await _dbService.createRecording(recording);
      widget.onUpdate();
    }
  }

  Future<void> _deleteRecording(Recording recording) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Recording'),
        content: const Text('Are you sure you want to delete this recording?'),
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
      await _dbService.deleteRecording(recording.id!);
      widget.onUpdate();
    }
  }

  String _formatDuration(int seconds) {
    final minutes = seconds ~/ 60;
    final secs = seconds % 60;
    return '${minutes.toString().padLeft(2, '0')}:${secs.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(24),
          child: Column(
            children: [
              Icon(
                _isRecording ? Icons.mic : Icons.mic_none,
                size: 64,
                color: _isRecording ? Colors.red : Colors.grey,
              ),
              const SizedBox(height: 16),
              if (_isRecording)
                Text(
                  _formatDuration(_recordingDuration),
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                        color: Colors.red,
                        fontWeight: FontWeight.bold,
                      ),
                ),
              const SizedBox(height: 24),
              ElevatedButton.icon(
                onPressed: _isRecording ? _stopRecording : _startRecording,
                icon:
                    Icon(_isRecording ? Icons.stop : Icons.fiber_manual_record),
                label:
                    Text(_isRecording ? 'Stop Recording' : 'Start Recording'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: _isRecording ? Colors.red : null,
                  foregroundColor: _isRecording ? Colors.white : null,
                  padding: const EdgeInsets.symmetric(
                    horizontal: 32,
                    vertical: 16,
                  ),
                ),
              ),
            ],
          ),
        ),
        Expanded(
          child: widget.songIdea.recordings.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.audiotrack, size: 64, color: Colors.grey[400]),
                      const SizedBox(height: 16),
                      Text(
                        'No recordings yet',
                        style: TextStyle(color: Colors.grey[600]),
                      ),
                    ],
                  ),
                )
              : ListView.builder(
                  itemCount: widget.songIdea.recordings.length,
                  itemBuilder: (context, index) {
                    final recording = widget.songIdea.recordings[index];

                    return Card(
                      margin: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      child: ListTile(
                          leading: CircleAvatar(
                            backgroundColor:
                                Theme.of(context).colorScheme.primaryContainer,
                            child: Icon(
                              Icons.music_note,
                              color: Theme.of(context)
                                  .colorScheme
                                  .onPrimaryContainer,
                            ),
                          ),
                          title: Text(
                            recording.title ?? 'Recording ${index + 1}',
                            style: const TextStyle(fontWeight: FontWeight.bold),
                          ),
                          subtitle: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              if (recording.notes != null) ...[
                                const SizedBox(height: 4),
                                Text(recording.notes!),
                              ],
                              const SizedBox(height: 4),
                              Row(
                                children: [
                                  Text(
                                    recording.durationSeconds != null
                                        ? _formatDuration(
                                            recording.durationSeconds!)
                                        : 'Unknown duration',
                                    style: TextStyle(
                                      fontSize: 12,
                                      color: Colors.grey[600],
                                    ),
                                  ),
                                  const SizedBox(width: 8),
                                  Text(
                                    '• ${DateFormat('MMM d, y • h:mm a').format(recording.createdAt)}',
                                    style: TextStyle(
                                      fontSize: 12,
                                      color: Colors.grey[600],
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          trailing: IconButton(
                            icon: const Icon(Icons.delete, color: Colors.red),
                            onPressed: () => _deleteRecording(recording),
                          ),
                          onTap: () async {
                            //_playRecording(recording);
                            await Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) =>
                                      PlayerWidget(recording: recording),
                                ));
                          }),
                    );
                  },
                ),
        ),
      ],
    );
  }
}
