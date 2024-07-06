// Register.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions';
import WelcomeMessage from './WelcomeMessage';

const Register = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await dispatch(register(email, password, confirmPassword));
            window.location.href = '/';
        } catch (error) {
            console.error('Registration error:', error);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <WelcomeMessage />
            <section>
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full bg-base-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                                Register to your account
                            </h1>
                            {error && <div className="alert alert-error">{error}</div>}
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block mb-2 text-sm font-medium">Email</label>
                                    <input className="input  input-m w-full" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium">Password</label>
                                    <input className="input  input-m w-full" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium">Confirm password</label>
                                    <input className="input  input-m w-full" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </div>

                                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                                    {loading ? 'Registering...' : 'Register'}
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;
