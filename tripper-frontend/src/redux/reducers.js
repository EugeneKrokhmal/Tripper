// src/redux/reducers.js

import { combineReducers } from 'redux';
import {
    SET_AUTH_TOKEN,
    SET_USER_ID,
    SET_TRIPS,
    LOGOUT,
} from './actions';

const initialAuthState = {
    isAuthenticated: false,
    authToken: null,
    userId: null,
};

const initialTripsState = {
    trips: [],
    loading: false,
    error: null,
};

// Reducer for authentication related actions
const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case SET_AUTH_TOKEN:
            return {
                ...state,
                isAuthenticated: true,
                authToken: action.payload,
            };
        case SET_USER_ID:
            return {
                ...state,
                userId: action.payload,
            };
        case LOGOUT:
            return initialAuthState;
        default:
            return state;
    }
};

// Reducer for trips related actions
const tripsReducer = (state = initialTripsState, action) => {
    switch (action.type) {
        case SET_TRIPS:
            return {
                ...state,
                trips: action.payload,
                loading: false,
                error: null,
            };
        case LOGOUT:
            return initialTripsState;
        default:
            return state;
    }
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    trips: tripsReducer,
    // Other reducers as needed
});

export default rootReducer;
