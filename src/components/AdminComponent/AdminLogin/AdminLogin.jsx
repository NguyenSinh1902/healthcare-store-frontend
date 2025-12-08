import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './AdminLogin.css';
import loginImg from '../../../assets/images/image_Login.png';
import { login } from '../../../services/authService';
import { loginSuccess } from '../../../redux/slices/authSlice';

/**
 * AdminLogin – UI only (no API integration yet).
 * Provides email & password fields and displays Ant Design messages for errors.
 */
const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    // If already logged in as admin, redirect to admin dashboard (placeholder)
    useEffect(() => {
        if (user?.role === 'ADMIN' || user?.role === 'admin') {
            navigate('/admin');
        }
    }, [user, navigate]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async e => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            message.error('Please fill in both fields');
            return;
        }
        setLoading(true);
        try {
            // API call
            console.log('Sending login request:', formData);
            const response = await login(formData.email, formData.password);
            console.log('Login response:', response);

            // Note: api.js interceptor returns response.data directly
            if (response && response.success) {
                if (response.role === 'ADMIN') {
                    console.log('Admin login successful');
                    message.success('Login successful');

                    // Dispatch login success to Redux
                    const userData = {
                        email: formData.email,
                        role: response.role
                    };

                    dispatch(loginSuccess({
                        user: userData,
                        token: response.token
                    }));

                    navigate('/admin');
                } else {
                    console.warn('Access denied: Role is', response.role);
                    message.error('Access denied. You are not an Admin.');
                }
            } else {
                console.error('Login failed:', response);
                message.error(response?.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            message.error(error.response?.data?.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    // Prevent rendering if already redirected
    if (user?.role === 'admin') return null;

    return (
        <div className="admin-login-wrapper">
            <div className="admin-login-container">
                <div className="admin-login-left">
                    <img src={loginImg} alt="Admin Login" className="admin-login-img" />
                </div>
                <div className="admin-login-right">
                    <h2 className="admin-login-title">Admin Sign In</h2>
                    <form className="admin-login-form" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="custom-input"
                                placeholder="admin@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                className="custom-input"
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-admin-login" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
