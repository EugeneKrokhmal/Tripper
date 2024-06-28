import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
                email,
                password
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-error">{error}</div>}
            <div className="form-control mb-3">
                <label>Email:</label>
                <input className="input input-bordered input-m" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-control mb-6">
                <label>Password:</label>
                <input className="input input-bordered input-m" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};

export default Login;
