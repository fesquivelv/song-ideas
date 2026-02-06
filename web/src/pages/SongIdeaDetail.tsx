import { useParams } from 'react-router-dom';
import Tabs from '../components/Tabs';
import Recorder from '../components/Recorder';
import ModalDialog from '../components/ModalDialog';
import { useState } from 'react';
import NewItem from '../components/NewItem';
import { useSongIdea } from '../hooks/useSongIdea';
import { useAddRecording } from '../hooks/useAddRecording';
import Lyrics from '../components/Lyrics';

export default function SongIdeaDetail() {
    const { id } = useParams<{ id: string }>();
    const { data: idea, isLoading, isError, error } = useSongIdea(id!);
    const { mutate, isPending } = useAddRecording();
    const [isAddRecordingModalOpen, setIsAddRecordingModalOpen] = useState(false);
    const [isAddLyricModalOpen, setIsAddLyricModalOpen] = useState(false);
    const [blob, setBlob] = useState<Blob | null>(null);

    const handleCloseAddRecordingModal = () => setIsAddRecordingModalOpen(false);
    const handleOpenAddRecordingModal = () => setIsAddRecordingModalOpen(true);

    const handleCloseAddLyricModal = () => setIsAddLyricModalOpen(false);
    const handleOpenAddLyricModal = () => {setIsAddLyricModalOpen(true);
    }

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
        handleOpenAddRecordingModal();
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
                    handleCloseAddRecordingModal();
                },
            },
        );
    };

    const addLyric = async (title: string, content: string) => {
        // Implement the logic to add a new lyric here
        alert(`Lyric titled "${title}" added successfully!`);
        handleCloseAddLyricModal();
    }

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
            content: <Lyrics lyrics={idea?.lyrics || []} onOpenAddLyricModal={handleOpenAddLyricModal}/>,
        },
    ];

    return (
        <>
            <div>{idea?.name}</div>
            <div>{idea?.description}</div>
            <Tabs tabs={tabs} />
            <ModalDialog
                isOpen={isAddRecordingModalOpen}
                onClose={handleCloseAddRecordingModal}
                title='New Song Idea'
            >
                <NewItem onAdd={addRecording} acceptButtonText={isPending ? "Saving..." : 'Save'}/>
            </ModalDialog>
            <ModalDialog
                isOpen={isAddLyricModalOpen}
                onClose={handleCloseAddLyricModal}
                title='New Lyric Idea'
            >
                <NewItem onAdd={addLyric} acceptButtonText={isPending ? "Saving..." : 'Save'}/>
            </ModalDialog>
        </>
    );
}
