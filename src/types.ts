interface SongIdea {
  id: string;
  name: string;
  description: string;
  chordSequence?: string;
  verse?: string;
  soloIdea?: string;
  melodyIdea?: string;
  lyrics?: string;
}

export type { SongIdea };