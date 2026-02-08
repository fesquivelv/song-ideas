import 'dart:io';
import 'package:record/record.dart';
import 'package:path_provider/path_provider.dart';

class RecordingService {
  final AudioRecorder _audioRecorder = AudioRecorder();

  Future<String?> startRecording() async {
    // Check and request permission using the record package's built-in method
    if (!await _audioRecorder.hasPermission()) {
      throw Exception(
          'Microphone permission not granted. Please grant microphone access in your device settings.');
    }

    final directory = await getApplicationDocumentsDirectory();
    final recordingPath = '${directory.path}/recordings';
    final dir = Directory(recordingPath);
    if (!await dir.exists()) {
      await dir.create(recursive: true);
    }

    final timestamp = DateTime.now().millisecondsSinceEpoch;
    final filePath = '$recordingPath/recording_$timestamp.m4a';

    try {
      await _audioRecorder.start(
        const RecordConfig(
          encoder: AudioEncoder.aacLc,
          bitRate: 128000,
          sampleRate: 44100,
        ),
        path: filePath,
      );
      return filePath;
    } catch (e) {
      throw Exception('Failed to start recording: $e');
    }
  }

  Future<String?> stopRecording() async {
    return await _audioRecorder.stop();
  }

  Future<void> pauseRecording() async {
    await _audioRecorder.pause();
  }

  Future<void> resumeRecording() async {
    await _audioRecorder.resume();
  }

  Future<bool> isRecording() async {
    return await _audioRecorder.isRecording();
  }

  Future<void> dispose() async {
    await _audioRecorder.dispose();
  }
}
