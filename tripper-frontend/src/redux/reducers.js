// reducers.js

import { combineReducers } from 'redux';
import {
    SET_AUTH_TOKEN,
    SET_USER_ID,
    LOGOUT,
} from './actions';

const initialAuthState = {
    isAuthenticated: false,
    authToken: null,
    userId: null,
};

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

const rootReducer = combineReducers({
    auth: authReducer,
    // Other reducers as needed
});

export default rootReducer;
