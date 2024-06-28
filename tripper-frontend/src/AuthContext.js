// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        authToken: null,
    });

    useEffect(() => {
        // Check if user is authenticated (e.g., check if token exists in localStorage)
        const token = localStorage.getItem('token');
        if (token) {
            setAuthState({
                isAuthenticated: true,
                authToken: token,
            });
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuthState({
            isAuthenticated: true,
            authToken: token,
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({
            isAuthenticated: false,
            authToken: null,
        });
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
