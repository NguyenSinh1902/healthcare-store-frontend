
import api from './api';

export const getAllAdminUsers = () => {

    return api.get('/profile/admin/users?role=USER');
};

export const updateUserStatus = (idUser, status) => {
    return api.put(`/profile/admin/${idUser}/status?status=${status}`);
};

export const deleteUser = (idUser) => {
    return api.delete(`/profile/admin/${idUser}`);
};
