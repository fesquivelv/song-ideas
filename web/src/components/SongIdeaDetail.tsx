import { useParams } from 'react-router-dom';
import Tabs from '../components/Tabs';
import Recorder from '../components/Recorder';
import ModalDialog from '../components/ModalDialog';
import { useState } from 'react';
import NewItem from '../components/NewItem';
import { useSongIdea } from '../hooks/useSongIdea';
import { useAddRecording } from '../hooks/useAddRecording';

export default function SongIdeaDetail() {
    const { id } = useParams<{ id: string }>();
    const { data: idea, isLoading, isError, error } = useSongIdea(id!);
    const { mutate, isPending } = useAddRecording();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [blob, setBlob] = useState<Blob | null>(null);

    const handleCloseModal = () => setIsModalOpen(false);
    const handleOpenModal = () => setIsModalOpen(true);

    if (isLoading)
        return (
            <div className='text-white p-10'>Searching for your idea...</div>
        );

    if (isError)
        return (
            <div className='text-red-500 p-10'>
                Error:{' '}
                {error instanceof Error ? error.message : 'Unknown error'}
            </div>
        );

    if (!idea) return <div className='text-white p-10'>No idea found.</div>;

    const onStoppedRecording = (blob: Blob) => {
        setBlob(blob);
        handleOpenModal();
    };

    const addRecording = async (name: string, description: string) => {
        mutate(
            {
                ideaId: idea.id,
                name,
                description,
                blob: blob!,
            },
            {
                onSuccess() {
                    alert('Recording added successfully!');
                    handleCloseModal();
                },
            },
        );
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
            <div>{idea?.name}</div>
            <div>{idea?.description}</div>
            <Tabs tabs={tabs} />
            <ModalDialog
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title='New Song Idea'
            >
                <NewItem onAdd={addRecording} acceptButtonText={isPending ? "Saving..." : 'Save'}/>
            </ModalDialog>
        </>
    );
}
