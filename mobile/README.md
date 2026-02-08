# Song Ideas App

A Flutter application for songwriters to save and organize their song ideas, record audio leaks, store chord sequences, and manage lyrics.

## Features

- **Song Ideas Management**: Create, view, edit, and delete song ideas with titles and descriptions
- **Audio Recording**: Record audio leaks/ideas directly in the app
- **Chord Sequences**: Save and organize chord progressions
- **Lyrics**: Store lyrics ideas organized by sections (verse, chorus, bridge, etc.)
- **Local Storage**: All data is stored locally using SQLite

## Getting Started

### Prerequisites

- Flutter SDK (3.0.0 or higher)
- Dart SDK (3.0.0 or higher)

### Installation

1. Install dependencies:
```bash
flutter pub get
```

2. Run the app:
```bash
flutter run
```

## Permissions

The app requires the following permissions:

- **Microphone**: For recording audio leaks
- **Storage**: For saving audio recordings

Permissions will be requested when you first try to record audio.

## Project Structure

```
lib/
├── main.dart                 # App entry point
├── models/
│   └── song_idea.dart       # Data models
├── services/
│   ├── database_service.dart # SQLite database operations
│   └── recording_service.dart # Audio recording functionality
├── screens/
│   ├── song_ideas_list_screen.dart
│   ├── song_idea_detail_screen.dart
│   └── create_song_idea_screen.dart
└── widgets/
    ├── chord_sequence_widget.dart
    ├── lyrics_widget.dart
    └── recording_widget.dart
```

## Usage

1. **Create a Song Idea**: Tap the + button on the main screen
2. **View Details**: Tap any song idea to view and edit its details
3. **Add Recordings**: Go to the Recordings tab and tap "Start Recording"
4. **Add Chord Sequences**: Go to the Chords tab and add chord progressions
5. **Add Lyrics**: Go to the Lyrics tab and add your lyrics

## Technologies Used

- Flutter
- SQLite (sqflite)
- Audio Recording (record package)
- Audio Playback (audioplayers package)
