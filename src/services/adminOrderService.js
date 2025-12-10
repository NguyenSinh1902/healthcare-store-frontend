import api from './api';

export const getAllOrders = async () => {
    try {
        const response = await api.get('/orders/all');
        return response;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};


export const updateOrderStatus = async (idOrder, status) => {
    try {
        const response = await api.put(`/orders/${idOrder}/status?status=${status}`);
        return response;
    } catch (error) {
        console.error(`Error updating order ${idOrder} status:`, error);
        throw error;
    }
};
