// actions.js

import axios from 'axios';

// Action types
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const SET_USER_ID = 'SET_USER_ID';
export const LOGOUT = 'LOGOUT';

// Action creators
export const setAuthToken = (token) => ({
    type: SET_AUTH_TOKEN,
    payload: token,
});

export const setUserId = (userId) => ({
    type: SET_USER_ID,
    payload: userId,
});

export const logout = () => ({
    type: LOGOUT,
});

// Thunk action creator to handle login
export const login = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
                email,
                password
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            dispatch(setAuthToken(token));
            await dispatch(fetchUserId(token));
        } catch (error) {
            console.error('Login error:', error);
            // Handle login failure
        }
    };
};

// Thunk action creator to handle registration
export const register = (email, password, confirmPassword) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
                email,
                password,
                confirmPassword
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            dispatch(setAuthToken(token));
            await dispatch(fetchUserId(token));
        } catch (error) {
            console.error('Registration error:', error);
            // Handle registration failure
            throw error; // Optional: Propagate the error to the component for additional handling
        }
    };
};
// Async function to fetch userId
export const fetchUserId = (token) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/users/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const userId = response.data._id; // Assuming response.data has the user object directly
            dispatch(setUserId(userId));
        } catch (error) {
            console.error('Error fetching userId:', error);
            // Handle error
        }
    };
};


// Thunk action creator to handle logout
export const logoutUser = () => {
    return async (dispatch) => {
        try {
            localStorage.removeItem('token');
            dispatch(logout());
        } catch (error) {
            console.error('Logout error:', error);
            // Handle logout error
        }
    };
};
