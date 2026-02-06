# Song Ideas Backend

A Node.js Express backend API for managing song ideas, recordings, and lyrics using MongoDB and Mongoose.

## Features

- Create, read, update, and delete song ideas
- Upload audio recordings using Multer (stored in `/uploads`)
- Manage lyrics for each song idea
- Full REST API with proper separation of concerns (Routes, Controllers, Models)
- MongoDB integration with Mongoose ODM
- CORS support
- Audio file validation and size limits (50MB)

## Project Structure

```
song-ideas-backend/
├── models/              # Mongoose schemas
│   ├── SongIdea.js
│   ├── Recording.js
│   └── Lyrics.js
├── controllers/         # Business logic
│   ├── songIdeasController.js
│   ├── recordingsController.js
│   └── lyricsController.js
├── routes/              # API endpoints
│   ├── songIdeas.js
│   ├── recordings.js
│   └── lyrics.js
├── middleware/          # Multer upload configuration
│   └── uploadMiddleware.js
├── config/              # Database configuration
│   └── database.js
├── uploads/             # Audio file storage directory
├── server.js            # Express app setup and start
├── package.json
└── .env.example
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB connection string and port (if needed)

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Song Ideas
- `GET /api/song-ideas` - Get all song ideas
- `GET /api/song-ideas/:id` - Get a specific song idea
- `POST /api/song-ideas` - Create a new song idea
- `PUT /api/song-ideas/:id` - Update a song idea
- `DELETE /api/song-ideas/:id` - Delete a song idea

### Recordings
- `POST /api/recordings/upload` - Upload a recording
- `GET /api/recordings/idea/:ideaId` - Get all recordings for a song idea
- `GET /api/recordings/:id` - Get a specific recording
- `PUT /api/recordings/:id` - Update recording metadata
- `DELETE /api/recordings/:id` - Delete a recording

### Lyrics
- `POST /api/lyrics` - Create new lyrics
- `GET /api/lyrics/idea/:ideaId` - Get all lyrics for a song idea
- `GET /api/lyrics/:id` - Get specific lyrics
- `PUT /api/lyrics/:id` - Update lyrics
- `DELETE /api/lyrics/:id` - Delete lyrics

## Upload Recording Example

```bash
curl -X POST http://localhost:5000/api/recordings/upload \
  -F "audio=@/path/to/audio.mp3" \
  -F "name=My First Recording" \
  -F "description=First recording of the song" \
  -F "ideaId=<song-idea-id>"
```

## Database Models

### SongIdea
```javascript
{
  id: string (UUID),
  name: string,
  description: string,
  lyrics: Lyrics[],
  recordings: Recording[],
  createdAt: string (ISO),
  updatedAt: string (ISO)
}
```

### Recording
```javascript
{
  id: string (UUID),
  name: string,
  description: string,
  ideaId: string,
  url: string (file path),
  createdAt: string (ISO),
  updatedAt: string (ISO)
}
```

### Lyrics
```javascript
{
  id: string (UUID),
  content: string,
  ideaId: string,
  updatedAt: string (ISO)
}
```

## Supported Audio Formats

- MP3 (audio/mpeg)
- WAV (audio/wav)
- WebM (audio/webm)
- OGG (audio/ogg)
- MP4 (audio/mp4)
- FLAC (audio/flac)

Maximum file size: 50MB

## Requirements

- Node.js 14+
- MongoDB 4.4+

## License

MIT
