
import api from './api';

export const getAllAdminStaff = () => {

    return api.get('/profile/admin/users?role=ADMIN');
};

export const updateStaffStatus = (idUser, status) => {
    // status should be either 'ACTIVE' or 'INACTIVE'
    return api.put(`/profile/admin/${idUser}/status?status=${status}`);
};

export const deleteStaff = (idUser) => {
    return api.delete(`/profile/admin/${idUser}`);
};
