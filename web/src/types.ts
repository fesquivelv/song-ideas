interface SongIdea {
  id: string;
  name: string;
  description: string;
  lyrics?: Lyric[];
  recordings?: Recording[];
  createdAt: string;
  updatedAt: string;
}

interface Recording {
  id: string;
  name: string;
  description: string;
  ideaId: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

interface Lyric {
  id: string;
  title: string;
  content: string;
  ideaId: string;
  updatedAt: string;
}

export type CreateSongInput = Pick<SongIdea, 'name' | 'description'>;

export type CreateRecordingInput = Pick<Recording, 'name' | 'description' | 'ideaId'> & { blob: Blob };

export type CreateLyricsInput = Pick<Lyric,'title' | 'content' | 'ideaId'>;

export type { SongIdea, Recording, Lyric };