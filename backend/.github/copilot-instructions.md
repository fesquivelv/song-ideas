# Song Ideas Backend - Development Guide

## Project Overview

This is a complete Node.js Express backend for a song ideas management application. The project follows a clean architecture with separation of concerns across Routes, Controllers, and Models.

## Key Features Implemented

✅ Express.js server with proper middleware setup
✅ MongoDB/Mongoose integration for data persistence
✅ Multer middleware for audio file uploads (stored in /uploads)
✅ Full CRUD operations for Song Ideas, Recordings, and Lyrics
✅ Clean separation: Models → Controllers → Routes
✅ Audio file validation and size limits (50MB)
✅ CORS support for cross-origin requests
✅ Static file serving for uploaded audio files

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env`
   - Update MongoDB URI if needed (defaults to localhost:27017)

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Test the server:**
   - Navigate to `http://localhost:5000/api/health`
   - You should see: `{"message":"Server is running"}`

## Architecture Details

### Models (`/models`)
- **SongIdea.js** - Main song document with embedded lyrics and recordings
- **Recording.js** - Audio file metadata and storage path
- **Lyrics.js** - Lyrical content for songs

### Controllers (`/controllers`)
- **songIdeasController.js** - Handles song CRUD operations
- **recordingsController.js** - Manages audio uploads and metadata
- **lyricsController.js** - Manages song lyrics

### Routes (`/routes`)
- **songIdeas.js** - `/api/song-ideas` endpoints
- **recordings.js** - `/api/recordings` endpoints (includes upload)
- **lyrics.js** - `/api/lyrics` endpoints

### Middleware (`/middleware`)
- **uploadMiddleware.js** - Multer configuration for audio file handling

## Important Notes

- Audio files are stored in the `/uploads` directory (creates automatically if missing)
- Files are served statically via `/uploads` route
- All timestamps are ISO strings
- UUIDs are generated for all resource IDs
- Song ideas maintain embedded references to related recordings and lyrics
- Deleting a song idea cascades deletion of associated recordings

## Next Steps / Enhancements

- Add authentication (JWT tokens)
- Add validation middleware for request bodies
- Implement pagination for list endpoints
- Add search/filter capabilities
- Set up proper error handling and logging
- Add unit tests with Jest
- Add API documentation (Swagger/OpenAPI)
- Implement soft deletes for audit trails
- Add file deletion when recordings are removed
