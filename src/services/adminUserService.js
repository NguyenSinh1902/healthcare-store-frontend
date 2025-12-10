// Service for admin user management
import api from './api';

// Get all users that are not BANNED
export const getAllAdminUsers = () => {
    // Fetch only users with role USER (excluding ADMIN)
    return api.get('/profile/admin/users?role=USER');
};

// Update user status (ACTIVE / INACTIVE)
export const updateUserStatus = (idUser, status) => {
    // status should be either 'ACTIVE' or 'INACTIVE'
    return api.put(`/profile/admin/${idUser}/status?status=${status}`);
};

// Soft‑delete a user (sets status to BANNED)
export const deleteUser = (idUser) => {
    return api.delete(`/profile/admin/${idUser}`);
};
