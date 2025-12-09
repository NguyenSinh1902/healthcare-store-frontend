import api from './api';

/**
 * Get all coupons (admin view)
 * GET /coupons
 */
export const getAllCoupons = async () => {
    try {
        const response = await api.get('/coupons');
        return response;
    } catch (error) {
        console.error('Error fetching coupons:', error);
        throw error;
    }
};

/**
 * Create a new coupon
 * POST /coupons
 */
export const createCoupon = async (payload) => {
    try {
        const response = await api.post('/coupons', payload);
        return response;
    } catch (error) {
        console.error('Error creating coupon:', error);
        throw error;
    }
};

/**
 * Update an existing coupon (without status)
 * PUT /coupons/{idCoupon}
 */
export const updateCoupon = async (idCoupon, payload) => {
    try {
        const response = await api.put(`/coupons/${idCoupon}`, payload);
        return response;
    } catch (error) {
        console.error(`Error updating coupon ${idCoupon}:`, error);
        throw error;
    }
};

/**
 * Update coupon status
 * PUT /coupons/{idCoupon}/status?status={status}
 */
export const updateCouponStatus = async (idCoupon, status) => {
    try {
        const response = await api.put(`/coupons/${idCoupon}/status?status=${status}`);
        return response;
    } catch (error) {
        console.error(`Error updating coupon status ${idCoupon}:`, error);
        throw error;
    }
};

/**
 * Delete a coupon (soft delete)
 * DELETE /coupons/{idCoupon}
 */
export const deleteCoupon = async (idCoupon) => {
    try {
        const response = await api.delete(`/coupons/${idCoupon}`);
        return response;
    } catch (error) {
        console.error(`Error deleting coupon ${idCoupon}:`, error);
        throw error;
    }
};
