import api from './api';

export const getAllCoupons = () => {
    return api.get('/coupons');
};

export const getCouponById = (id) => {
    return api.get(`/coupons/${id}`);
};

export const getCouponByCode = (code) => {
    return api.get(`/coupons/code/${code}`);
};
