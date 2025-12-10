import api from './api';

export const getStats = async () => {
    try {
        const response = await api.get('/dashboard/stats');
        return response;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
    }
};

export const getTrend = async () => {
    try {
        const response = await api.get('/dashboard/trend');
        return response;
    } catch (error) {
        console.error('Error fetching trend data:', error);
        throw error;
    }
};

export const getCategoryDistribution = async () => {
    try {
        const response = await api.get('/dashboard/category-distribution');
        return response;
    } catch (error) {
        console.error('Error fetching category distribution:', error);
        throw error;
    }
};

export const getRecentOrders = async () => {
    try {
        const response = await api.get('/dashboard/recent-orders');
        return response;
    } catch (error) {
        console.error('Error fetching recent orders:', error);
        throw error;
    }
};

export const getTopProducts = async () => {
    try {
        const response = await api.get('/dashboard/top-products');
        return response;
    } catch (error) {
        console.error('Error fetching top products:', error);
        throw error;
    }
};
