import { useParams } from 'react-router-dom';
import type { SongIdea } from '../types';
import Tabs from '../components/Tabs';
import Recorder from '../components/Recorder';
import ModalDialog from '../components/ModalDialog';
import { useState } from 'react';
import NewItem from '../components/NewItem';

interface Props {
    ideas: SongIdea[];
    onUpdate: (id: string, updated: Partial<SongIdea>) => void;
}

export default function SongIdeaDetail({ ideas }: Props) {
    const { id } = useParams<{ id: string }>();
    const idea = ideas.find((i) => i.id === id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [blobUrl, setBlobUrl] = useState<string>('');

    const handleCloseModal = () => setIsModalOpen(false);
    const handleOpenModal = () => setIsModalOpen(true);

    const onStoppedRecording = (mediaBlobUrl: string) => {
        setBlobUrl(mediaBlobUrl);
        handleOpenModal();
    };

    const addRecording = (name: string, description: string) => {
        const idea = ideas.find((i) => i.id === id);
        const newRecording = {
            id: Date.now().toString(),
            name: name,
            description: description,
            url: blobUrl,
            createdAt: new Date().toString(),
            ideaId: id!,
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        idea && idea.recordings
            ? idea.recordings.push(newRecording)
            : (idea!.recordings = [newRecording]);
        handleCloseModal();
    };

    const tabs: { label: string; content: React.ReactNode }[] = [
        {
            label: 'Records',
            content: (
                <Recorder
                    recordings={idea?.recordings || []}
                    onStop={onStoppedRecording}
                />
            ),
        },
        {
            label: 'Lyrics',
            content: <div>Lyrics content for {idea?.name}</div>,
        },
    ];

    return (
        <>
            <Tabs tabs={tabs} />
            <ModalDialog
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title='New Song Idea'
            >
                <NewItem onAdd={addRecording} />
            </ModalDialog>
        </>
    );
}
