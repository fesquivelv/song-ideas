import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <header className='bg-primary'>
                <nav className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'>
                    <Link to='/' className='text-xl font-bold'>
                        Song Ideas App
                    </Link>
                    <div>Log in</div>
                </nav>
            </header>
            <div className='mx-auto max-w-7xl p-6 lg:px-8'>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
