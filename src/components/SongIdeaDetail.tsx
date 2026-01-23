import { useParams, useNavigate } from 'react-router-dom';
import type { SongIdea } from '../types';
import Tabs from './Tabs';

interface Props {
  ideas: SongIdea[];
  onUpdate: (id: string, updated: Partial<SongIdea>) => void;
}

export default function SongIdeaDetail({ ideas, onUpdate }: Props) {
  const { id } = useParams<{ id: string }>();
  const idea = ideas.find(i => i.id === id);

  const tabs: { label: string; content: React.ReactNode }[] = [
    {
      label: 'Records',
      content: <div>Records content for {idea?.name}</div>
    },
    {
      label: 'Lyrics',
      content: <div>Lyrics content for {idea?.name}</div>
    }
  ];

  return (
    <Tabs tabs={tabs} />
  );
 
}