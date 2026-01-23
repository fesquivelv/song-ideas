import { Link } from 'react-router-dom';
import type { SongIdea } from '../types';
import ModalDialog from './ModalDialog';
import NewSongIdea from './NewSongIdea';
import { useState } from 'react';


interface Props {
  ideas: SongIdea[];
  addIdea: (idea: Omit<SongIdea, 'id'>) => void;
}


export default function SongIdeasList({ideas, addIdea}: Props) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => setIsModalOpen(false);
    const handleOpenModal = () => setIsModalOpen(true);


    const onAddIdea = (idea: Omit<SongIdea, 'id'>) => {
        setIsModalOpen(false);
        addIdea(idea);
    }

    return (<>
        <div >
            <h1 className="text-2xl font-bold mb-4">Song Ideas</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleOpenModal}>Create New Song Idea</button>
            <ul className="mt-4">
                {ideas.map(idea => (
                    <li key={idea.id} className="border p-2 mb-2">
                        <Link to={`/idea/${idea.id}`} className="text-blue-600">{idea.name}</Link>
                        <p>{idea.description}</p>
                    </li>
                ))}
            </ul>
            <ModalDialog isOpen={isModalOpen} onClose={handleCloseModal} title="New Song Idea">
                <NewSongIdea onAdd={onAddIdea} />
            </ModalDialog>
        </div>
    </>);
}