import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import SongIdeasList from './pages/SongIdeasList';
import SongIdeaDetail from './pages/SongIdeaDetail';
import type { SongIdea } from './types';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    const [ideas, setIdeas] = useState<SongIdea[]>([]);



    const updateIdea = (id: string, updated: Partial<SongIdea>) => {
        setIdeas(ideas.map((i) => (i.id === id ? { ...i, ...updated } : i)));
    };

    return (
      <ErrorBoundary>
         <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route
                        path='/'
                        element={
                            <SongIdeasList />
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
      </ErrorBoundary>
       
    );
}

export default App;
