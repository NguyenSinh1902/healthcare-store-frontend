import api from './api';

export const register = (fullName, email, password, confirmPassword, role) => {
    return api.post('/auth/register', {
        fullName,
        email,
        password,
        confirmPassword,
        role
    });
};

export const login = (email, password) => {
    return api.post('/auth/login', { email, password });
};