import api from './api';

export const getAllCoupons = async () => {
    try {
        const response = await api.get('/coupons');
        return response;
    } catch (error) {
        console.error('Error fetching coupons:', error);
        throw error;
    }
};

export const createCoupon = async (payload) => {
    try {
        const response = await api.post('/coupons', payload);
        return response;
    } catch (error) {
        console.error('Error creating coupon:', error);
        throw error;
    }
};

export const updateCoupon = async (idCoupon, payload) => {
    try {
        const response = await api.put(`/coupons/${idCoupon}`, payload);
        return response;
    } catch (error) {
        console.error(`Error updating coupon ${idCoupon}:`, error);
        throw error;
    }
};

export const updateCouponStatus = async (idCoupon, status) => {
    try {
        const response = await api.put(`/coupons/${idCoupon}/status?status=${status}`);
        return response;
    } catch (error) {
        console.error(`Error updating coupon status ${idCoupon}:`, error);
        throw error;
    }
};

export const deleteCoupon = async (idCoupon) => {
    try {
        const response = await api.delete(`/coupons/${idCoupon}`);
        return response;
    } catch (error) {
        console.error(`Error deleting coupon ${idCoupon}:`, error);
        throw error;
    }
};
