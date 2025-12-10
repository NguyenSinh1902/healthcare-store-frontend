import api from './api';

export const getProfile = () => {
    return api.get('/profile/my-profile');
};

export const updateProfile = (profileData) => {
    const formData = new FormData();

    // Append text fields
    if (profileData.fullName) formData.append('fullName', profileData.fullName);
    if (profileData.phone) formData.append('phone', profileData.phone);
    if (profileData.address) formData.append('address', profileData.address);
    if (profileData.dateOfBirth) formData.append('dateOfBirth', profileData.dateOfBirth);

    // Append avatar file if provided
    if (profileData.avatar) {
        formData.append('avatar', profileData.avatar);
    }

    return api.put('/profile/my-profile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
