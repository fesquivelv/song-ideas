import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SongIdeasList from './pages/SongIdeasList';
import SongIdeaDetail from './pages/SongIdeaDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { GlobalPlayer } from './components/GlobalPlayer';

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/' element={<Layout />}>
                        <Route path='/' element={<ProtectedRoute><SongIdeasList /></ProtectedRoute>} />
                        <Route path='/idea/:id' element={<ProtectedRoute><SongIdeaDetail /></ProtectedRoute>} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <GlobalPlayer />
        </ErrorBoundary>
    );
}

export default App;
