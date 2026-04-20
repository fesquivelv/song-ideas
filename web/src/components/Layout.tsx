import { Link, Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
    }
    
    return (
        <>
            <header className='bg-primary'>
                <nav className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'>
                    <Link to='/' className='text-xl font-bold'>
                        Song Ideas App
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="px-3 py-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
                    >
                        Log out
                    </button>
                </nav>
            </header>
            <div className='mx-auto max-w-7xl p-6 lg:px-8'>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
