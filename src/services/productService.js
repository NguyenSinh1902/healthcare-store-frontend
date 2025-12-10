import api from './api';

export const getProductsByGroup = (group) => {
    return api.get(`/products/group/${group}`);
};

export const getAllProducts = () => {
    return api.get('/products/all');
};

export const getProductById = (id) => {
    return api.get(`/products/${id}`);
};

export const getProductsByCategory = (categoryId) => {
    return api.get(`/products/category/${categoryId}`);
};

export const searchProducts = (query) => {
    return api.get(`/products/search?query=${query}`);
};

export const filterProductsByCategory = (categoryId, filters) => {
    const params = new URLSearchParams(filters);
    return api.get(`/products/category/${categoryId}/filter?${params.toString()}`);
};

export const createProduct = (formData) => {
    return api.post('/products', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const updateProduct = (id, formData) => {
    return api.put(`/products/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteProduct = (id) => {
    return api.delete(`/products/${id}`);
};
