import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/song_idea.dart';
import '../services/database_service.dart';
import 'song_idea_detail_screen.dart';
import 'create_song_idea_screen.dart';

class SongIdeasListScreen extends StatefulWidget {
  const SongIdeasListScreen({super.key});

  @override
  State<SongIdeasListScreen> createState() => _SongIdeasListScreenState();
}

class _SongIdeasListScreenState extends State<SongIdeasListScreen> {
  final DatabaseService _dbService = DatabaseService.instance;
  List<SongIdea> _songIdeas = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadSongIdeas();
  }

  Future<void> _loadSongIdeas() async {
    setState(() => _isLoading = true);
    final ideas = await _dbService.getAllSongIdeas();
    setState(() {
      _songIdeas = ideas;
      _isLoading = false;
    });
  }

  Future<void> _deleteSongIdea(SongIdea idea) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Song Idea'),
        content: Text('Are you sure you want to delete "${idea.title}"?'),
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
      await _dbService.deleteSongIdea(idea.id!);
      _loadSongIdeas();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Song Ideas'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _songIdeas.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.music_note_outlined,
                        size: 64,
                        color: Colors.grey[400],
                      ),
                      const SizedBox(height: 16),
                      Text(
                        'No song ideas yet',
                        style: TextStyle(
                          fontSize: 18,
                          color: Colors.grey[600],
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Tap the + button to create one',
                        style: TextStyle(color: Colors.grey[500]),
                      ),
                    ],
                  ),
                )
              : RefreshIndicator(
                  onRefresh: _loadSongIdeas,
                  child: ListView.builder(
                    itemCount: _songIdeas.length,
                    itemBuilder: (context, index) {
                      final idea = _songIdeas[index];
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
                              color: Theme.of(context).colorScheme.onPrimaryContainer,
                            ),
                          ),
                          title: Text(
                            idea.title,
                            style: const TextStyle(fontWeight: FontWeight.bold),
                          ),
                          subtitle: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              if (idea.description != null) ...[
                                const SizedBox(height: 4),
                                Text(
                                  idea.description!,
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ],
                              const SizedBox(height: 4),
                              Text(
                                'Updated: ${DateFormat('MMM d, y • h:mm a').format(idea.updatedAt)}',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Colors.grey[600],
                                ),
                              ),
                            ],
                          ),
                          trailing: PopupMenuButton(
                            itemBuilder: (context) => [
                              const PopupMenuItem(
                                value: 'delete',
                                child: Row(
                                  children: [
                                    Icon(Icons.delete, color: Colors.red),
                                    SizedBox(width: 8),
                                    Text('Delete'),
                                  ],
                                ),
                              ),
                            ],
                            onSelected: (value) {
                              if (value == 'delete') {
                                _deleteSongIdea(idea);
                              }
                            },
                          ),
                          onTap: () async {
                            await Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) =>
                                    SongIdeaDetailScreen(songIdeaId: idea.id!),
                              ),
                            );
                            _loadSongIdeas();
                          },
                        ),
                      );
                    },
                  ),
                ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          await Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const CreateSongIdeaScreen(),
            ),
          );
          _loadSongIdeas();
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
