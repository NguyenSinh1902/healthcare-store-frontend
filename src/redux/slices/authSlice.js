import { createSlice } from '@reduxjs/toolkit';

// Helper to check for existing token
const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
    user: storedUser,
    token: storedToken,
    isAuthenticated: !!storedToken,
    isLoading: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user; // Expecting payload to have user object
            state.token = action.payload.token;
            state.error = null;

            // Persist to localStorage
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        loginFailed: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = null;

            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
});

export const { loginStart, loginSuccess, loginFailed, logout } = authSlice.actions;

export default authSlice.reducer;
