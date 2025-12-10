import api from './api';

export const getParentCategories = () => {
    return api.get('/categories/parents');
};

export const getSubCategories = (parentId) => {
    return api.get(`/categories/${parentId}/subcategories`);
};

export const getAllCategories = () => {
    // Adjusted endpoint to fetch all categories (backend uses GET /categories)
    return api.get('/categories');
};

export const createCategory = (formData) => {
    return api.post('/categories', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const updateCategory = (id, formData) => {
    return api.put(`/categories/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteCategory = (id) => {
    return api.delete(`/categories/${id}`);
};
