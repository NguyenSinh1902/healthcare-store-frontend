import api from './api';

export const createPaymentUrl = (orderId, bankCode = 'NCB') => {
    return api.post('/payment/create_url', {
        orderId,
        bankCode
    });
};

export const getAdminTransactions = (params) => {
    return api.get('/payment/admin/transactions', { params });
};

export const getAdminPaymentDashboard = () => {
    return api.get('/payment/admin/dashboard');
};

export const getAdminPaymentChart = () => {
    return api.get('/payment/admin/chart');
};
