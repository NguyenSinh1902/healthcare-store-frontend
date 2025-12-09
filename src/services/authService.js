import api from './api'; // Đảm bảo import đúng file cấu hình axios của bạn

export const register = (fullName, email, password, confirmPassword, role) => {
    // KHÔNG dùng async/await ở đây, return thẳng Promise của axios
    // Để Component tự xử lý .data
    return api.post('/auth/register', {
        fullName,
        email,
        password,
        confirmPassword,
        role
    });
};

export const login = (email, password) => {
    return api.post('/auth/login', { email, password });
};

export const verifyAccount = (email, verificationCode) => {
    return api.post('/auth/verify', { email, verificationCode });
};