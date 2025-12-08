import api from './api';

export const getProfile = () => {
    return api.get('/profile/my-profile');
};

export const updateProfile = (profileData) => {
    return api.put('/profile/my-profile', profileData);
};
