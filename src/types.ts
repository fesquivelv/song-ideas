interface SongIdea {
  id: string;
  name: string;
  description: string;
  lyrics?: Lyrics[];
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

interface Lyrics {
  id: string;
  content: string;
  ideaId: string;
  updatedAt: string;
}

export type CreateSongInput = Pick<SongIdea, 'name' | 'description'>;

export type { SongIdea, Recording, Lyrics };