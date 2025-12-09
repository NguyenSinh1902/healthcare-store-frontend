import api from './api';

export const createOrder = (orderData) => {
    return api.post('/orders/checkout', orderData);
};

export const getMyOrders = () => {
    return api.get('/orders/my-orders');
};

export const getOrderById = (id) => {
    return api.get(`/orders/${id}`);
};
