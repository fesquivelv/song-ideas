import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SongIdeasList from './pages/SongIdeasList';
import SongIdeaDetail from './pages/SongIdeaDetail';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
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
