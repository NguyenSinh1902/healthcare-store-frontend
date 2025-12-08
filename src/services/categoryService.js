import api from './api';

export const getParentCategories = () => {
    return api.get('/categories/parents');
};

export const getSubCategories = (parentId) => {
    return api.get(`/categories/${parentId}/subcategories`);
};
