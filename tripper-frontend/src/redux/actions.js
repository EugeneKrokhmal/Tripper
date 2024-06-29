import axios from 'axios';

// Action types
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const SET_USER_ID = 'SET_USER_ID';
export const LOGOUT = 'LOGOUT';
export const SET_TRIPS = 'SET_TRIPS';

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

export const setTrips = (trips) => ({
    type: SET_TRIPS,
    payload: trips,
});

// Thunk action creator to handle login
export const login = (token) => {
    return async (dispatch) => {
        dispatch(setAuthToken(token));
        try {
            const userId = await fetchUserId(token); // Fetch userId here
            dispatch(setUserId(userId));
            localStorage.setItem('token', token);
        } catch (error) {
            console.error('Error fetching userId:', error);
            dispatch(logout()); // Log out if userId fetch fails
        }
    };
};

// Async function to fetch userId
export const fetchUserId = async (token) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.userId;
    } catch (error) {
        console.error('Error fetching userId:', error);
        throw error;
    }
};

// Thunk action creator to fetch trips
export const fetchTrips = () => {
    return async (dispatch, getState) => {
        const { auth } = getState(); // Get auth state from Redux store
        const token = auth.authToken; // Get token from auth state

        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/trips`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(setTrips(response.data)); // Dispatch setTrips action to update trips state in Redux
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };
};
