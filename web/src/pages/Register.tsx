import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { email, password });
            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4'>
            <div className='text-center mb-10'>
                <h2 className='text-3xl font-bold text-white'>
                    Create your account
                </h2>
                <p className='text-gray-400 mt-2'>
                    Start to orginize your compositions
                </p>
            </div>
            <form onSubmit={handleSubmit} className='space-y-6'>
                {error && (
                    <div className='bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm'>
                        {error}
                    </div>
                )}
                <div>
                    <label className='block text-sm font-medium text-gray'>
                        Email:
                    </label>
                    <input
                        type='email'
                        className='mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
                        placeholder='Type your email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray'>
                        Password:
                    </label>
                    <input
                        type='password'
                        className='mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
                        placeholder='*******'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 transform hover:scale-[1.02]'>Sign in</button>
                <p className='mt-8 text-center text-gray-400'>
                    Already have an account? <Link to='/login' className='text-blue-500 hover:text-blue-400 font font-medium'>Log in</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
