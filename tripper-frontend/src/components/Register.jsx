// components/Register.js

import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
                email,
                password,
                confirmPassword
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Registration error:', error);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-error">{error}</div>}
            <div className="form-control">
                <label>Email:</label>
                <input className="input input-bordered input-m mb-3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-control">
                <label>Password:</label>
                <input className="input input-bordered input-m mb-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="form-control">
                <label>Confirm Password:</label>
                <input className="input input-bordered input-m mb-3" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
};

export default Register;
