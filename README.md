# Song Ideas

A React application built with Vite and TypeScript for managing song ideas. Users can create, view, and edit song ideas including chord sequences, verses, solo ideas, melody ideas, and lyrics.

## Features

- **Song Ideas List**: View all created song ideas with names and descriptions.
- **Create New Idea**: Add new song ideas with basic information.
- **Song Idea Detail**: Edit and manage detailed aspects of each song idea, including:
  - Chord sequences
  - Verses
  - Solo ideas
  - Melody ideas
  - Lyrics

## Technologies Used

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── SongIdeasList.tsx
│   ├── SongIdeaDetail.tsx
│   └── NewSongIdea.tsx
├── types.ts
├── App.tsx
├── main.tsx
└── index.css
```
