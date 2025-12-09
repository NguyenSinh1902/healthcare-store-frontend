// Service for admin staff management
import api from './api';

// Get all staff users (ADMIN role)
export const getAllAdminStaff = () => {
    // Fetch only users with role ADMIN
    return api.get('/profile/admin/users?role=ADMIN');
};

// Update staff user status (ACTIVE / INACTIVE)
export const updateStaffStatus = (idUser, status) => {
    // status should be either 'ACTIVE' or 'INACTIVE'
    return api.put(`/profile/admin/${idUser}/status?status=${status}`);
};

// Soft‑delete a staff user (sets status to BANNED)
export const deleteStaff = (idUser) => {
    return api.delete(`/profile/admin/${idUser}`);
};
