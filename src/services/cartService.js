import api from './api';

export const addToCart = (idProduct, quantity) => {
    return api.post('/cart/add', { idProduct, quantity });
};

export const getCart = () => {
    return api.get('/cart/my-cart');
};

export const updateCartItem = (idCartItem, quantity) => {
    return api.put(`/cart/item/${idCartItem}?quantity=${quantity}`);
};

export const removeCartItem = (idCartItem) => {
    return api.delete(`/cart/item/${idCartItem}`);
};

export const clearCart = () => {
    return api.delete('/cart/clear');
};
