import { Link } from 'react-router-dom';
import type { SongIdea } from '../types';
import ModalDialog from '../components/ModalDialog';
import {  useState } from 'react';
import NewItem from '../components/NewItem';
import { useQuery } from '@tanstack/react-query';
import { fetchSongIdeasList } from '../api/songIdeasApi';
import { useCreateSong } from '../hooks/useCreateSongIdea';

export default function SongIdeasList() {
    const { data: ideas = [], error, isLoading: loading } = useQuery<SongIdea[], Error>({
        queryKey:['songIdeas'],
        queryFn:fetchSongIdeasList
    });

    const { mutate, isPending, isError } = useCreateSong();

    const [isModalOpen, setIsModalOpen] = useState(false);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    const handleCloseModal = () => setIsModalOpen(false);
    const handleOpenModal = () => setIsModalOpen(true);

    const onAddIdea = async (name: string, description: string) => {
        mutate({ name, description }, {
            onSuccess() {
                alert('Song idea created successfully!');
            },
        });
        setIsModalOpen(false);
    };

    return (
        <>
            <div>
                <h1 className='text-2xl font-bold mb-4'>Song Ideas</h1>
                {isPending ? 'Saving...' : ''}
                {isError && <p className="text-red-400 text-sm">Oops! Something went wrong.</p>}
                <button
                    className='bg-primary  px-4 py-2 rounded'
                    onClick={handleOpenModal}
                >
                    Create New Song Idea
                </button>
                <ul className='mt-4'>
                    {ideas.map((idea) => (
                        <li key={idea.id} className='border p-2 mb-2'>
                            <Link
                                to={`/idea/${idea.id}`}
                                className='text-secondary'
                            >
                                {idea.name}
                            </Link>
                            <p>{idea.description}</p>
                        </li>
                    ))}
                </ul>
                <ModalDialog
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    title='New Song Idea'
                >
                    <NewItem onAdd={onAddIdea} />
                </ModalDialog>
            </div>
        </>
    );
}

