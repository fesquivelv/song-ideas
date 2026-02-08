import 'package:audio_video_progress_bar/audio_video_progress_bar.dart';
import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import 'package:song_ideas_app/models/song_idea.dart';

class PlayerWidget extends StatefulWidget {
  final Recording recording;
  const PlayerWidget({super.key, required this.recording});
  @override
  State<PlayerWidget> createState() => _PlayerWidgetState();
}

class _PlayerWidgetState extends State<PlayerWidget> {
  final AudioPlayer _audioPlayer = AudioPlayer();

  @override
  void initState() {
    super.initState();
    _initAudioPlayer();
  }

  Future<void> _initAudioPlayer() async {
    print(widget.recording.filePath);
    await _audioPlayer.setFilePath(widget.recording.filePath);
  }

  @override
  void dispose() {
    _audioPlayer.dispose();
    super.dispose();
  }

  Widget slider() {
    return StreamBuilder<Duration?>(
        stream: _audioPlayer.durationStream,
        builder: (context, durationSnapshot) {
          final duration = durationSnapshot.data ?? Duration.zero;
          return StreamBuilder(
              stream: _audioPlayer.positionStream,
              builder: (context, positionSnapshot) {
                final position = positionSnapshot.data ?? Duration.zero;
                return ProgressBar(
                  progressBarColor: Colors.blue,
                  baseBarColor: Colors.grey.withAlpha(5),
                  bufferedBarColor: Colors.lightBlue.withAlpha(5),
                  thumbColor: Colors.blue,
                  progress: position,
                  buffered: Duration.zero,
                  total: duration,
                  onSeek: (value) {
                    _audioPlayer.seek(value);
                  },
                );
              });
        });
  }

  Widget playerButtons() {
    return StreamBuilder<PlayerState>(
        stream: _audioPlayer.playerStateStream,
        builder: (context, snaphot) {
          final playerState = snaphot.data;
          final processingState = playerState?.processingState;
          final playing = playerState?.playing;
          if (processingState == ProcessingState.loading ||
              processingState == ProcessingState.buffering) {
            return const CircularProgressIndicator();
          } else if (playing == false) {
            return IconButton(
              style: IconButton.styleFrom(
                backgroundColor: Theme.of(context).colorScheme.primaryContainer,
                foregroundColor:
                    Theme.of(context).colorScheme.onPrimaryContainer,
              ),
              iconSize: 64.0,
              icon: const Icon(Icons.play_arrow),
              onPressed: _audioPlayer.play,
            );
          } else {
            return IconButton(
              style: IconButton.styleFrom(
                backgroundColor: Theme.of(context).colorScheme.primaryContainer,
                foregroundColor:
                    Theme.of(context).colorScheme.onPrimaryContainer,
              ),
              iconSize: 64.0,
              icon: const Icon(Icons.pause),
              onPressed: _audioPlayer.pause,
            );
          }
        });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Mi song"),
      ),
      body: Column(children: [
        Container(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              const Text("Mi description song"),
              const SizedBox(height: 16),
              slider(),
              playerButtons()
            ],
          ),
        )
      ]),
    );
  }
}
