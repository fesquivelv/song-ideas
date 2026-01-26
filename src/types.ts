interface SongIdea {
  id: string;
  name: string;
  description: string;
  soloIdea?: string;
  melodyIdea?: string;
  lyrics?: string;
  recordings?: Recording[];
}

interface Recording {
  id: string;
  name: string;
  description: string;
  ideaId: string;
  url: string;
  createdAt: string;
}

export type { SongIdea, Recording };