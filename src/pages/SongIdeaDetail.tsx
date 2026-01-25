import { useParams } from 'react-router-dom';
import type { SongIdea } from '../types';
import Tabs from '../components/Tabs';
import Recorder from '../components/Recorder';

interface Props {
    ideas: SongIdea[];
    onUpdate: (id: string, updated: Partial<SongIdea>) => void;
}

export default function SongIdeaDetail({ ideas }: Props) {
    const { id } = useParams<{ id: string }>();
    const idea = ideas.find((i) => i.id === id);

    const tabs: { label: string; content: React.ReactNode }[] = [
        {
            label: 'Records',
            content: <Recorder recordings={idea?.recordings || []} />,
        },
        {
            label: 'Lyrics',
            content: <div>Lyrics content for {idea?.name}</div>,
        },
    ];

    return <Tabs tabs={tabs} />;
}
