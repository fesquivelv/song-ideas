import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import SongIdeasList from './pages/SongIdeasList';
import SongIdeaDetail from './pages/SongIdeaDetail';
import type { SongIdea } from './types';
import Layout from './components/Layout';

function App() {
    const [ideas, setIdeas] = useState<SongIdea[]>([]);

    const addIdea = (idea: Omit<SongIdea, 'id'>) => {
        const newIdea: SongIdea = { ...idea, id: Date.now().toString() };
        setIdeas([...ideas, newIdea]);
    };

    const updateIdea = (id: string, updated: Partial<SongIdea>) => {
        setIdeas(ideas.map((i) => (i.id === id ? { ...i, ...updated } : i)));
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route
                        path='/'
                        element={
                            <SongIdeasList ideas={ideas} addIdea={addIdea} />
                        }
                    />
                    <Route
                        path='/idea/:id'
                        element={
                            <SongIdeaDetail
                                ideas={ideas}
                                onUpdate={updateIdea}
                            />
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
