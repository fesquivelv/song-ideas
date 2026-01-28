import { Link } from 'react-router-dom';
import type { SongIdea } from '../types';
import ModalDialog from '../components/ModalDialog';
import { use, useState } from 'react';
import NewItem from '../components/NewItem';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useRealTimeData } from '../hooks/useRealTimeData';

export default function SongIdeasList() {
    const { data: ideas, loading, error } = useRealTimeData<SongIdea>("songIdeas");
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    

    const handleCloseModal = () => setIsModalOpen(false);
    const handleOpenModal = () => setIsModalOpen(true);

    const onAddIdea = async (name: string, description: string) => {
        setIsModalOpen(false);
        try {
            const docRef = await addDoc(collection(db, "songIdeas"), {
                name: name,
                description: description,
                createdAt: new Date().toString(),
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <>
            <div>
                <h1 className='text-2xl font-bold mb-4'>Song Ideas</h1>
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
