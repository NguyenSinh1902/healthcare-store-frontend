import api from './api';

/**
 * Get dashboard statistics (total revenue, orders, products, customers)
 * GET /api/dashboard/stats
 */
export const getStats = async () => {
    try {
        const response = await api.get('/dashboard/stats');
        return response;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
    }
};

/**
 * Get revenue and orders trend by month
 * GET /api/dashboard/trend
 */
export const getTrend = async () => {
    try {
        const response = await api.get('/dashboard/trend');
        return response;
    } catch (error) {
        console.error('Error fetching trend data:', error);
        throw error;
    }
};

/**
 * Get category sales distribution
 * GET /api/dashboard/category-distribution
 */
export const getCategoryDistribution = async () => {
    try {
        const response = await api.get('/dashboard/category-distribution');
        return response;
    } catch (error) {
        console.error('Error fetching category distribution:', error);
        throw error;
    }
};

/**
 * Get recent orders (5 latest)
 * GET /api/dashboard/recent-orders
 */
export const getRecentOrders = async () => {
    try {
        const response = await api.get('/dashboard/recent-orders');
        return response;
    } catch (error) {
        console.error('Error fetching recent orders:', error);
        throw error;
    }
};

/**
 * Get top selling products (5 top)
 * GET /api/dashboard/top-products
 */
export const getTopProducts = async () => {
    try {
        const response = await api.get('/dashboard/top-products');
        return response;
    } catch (error) {
        console.error('Error fetching top products:', error);
        throw error;
    }
};
