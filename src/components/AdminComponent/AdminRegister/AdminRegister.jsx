import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import './AdminRegister.css';
import registerImg from '../../../assets/images/image_Register.png';
import { register } from '../../../services/authService';

/**
 * AdminRegister – UI only (no API integration yet).
 * Mirrors the client RegisterComponent but scoped for admin users.
 */
const AdminRegister = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    // If already logged in as admin, redirect to admin dashboard
    useEffect(() => {
        if (user?.role === 'admin') {
            navigate('/admin');
        }
    }, [user, navigate]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async e => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            message.error('Passwords do not match!');
            return;
        }
        setLoading(true);
        try {
            // Placeholder API call – will be wired later
            const response = await register(
                formData.fullName,
                formData.email,
                formData.password,
                formData.confirmPassword,
                'ADMIN'
            );
            if (response && response.success) {
                message.success('Admin registration successful! Please login.');
                navigate('/admin/login');
            } else if (response && response.errors) {
                response.errors.forEach(err => message.error(err.message));
            } else {
                message.error(response?.message || 'Registration failed');
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                error.response.data.errors.forEach(err => message.error(err.message));
            } else {
                message.error(error.response?.data?.message || 'An error occurred during registration.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Prevent rendering if already redirected
    if (user?.role === 'admin') return null;

    return (
        <div className="admin-register-wrapper">
            <div className="admin-register-container">
                <div className="admin-register-left">
                    <img src={registerImg} alt="Admin Register" className="admin-register-img" />
                </div>
                <div className="admin-register-right">
                    <h2 className="admin-register-title">Admin Sign Up</h2>
                    <form className="admin-register-form" onSubmit={handleRegister}>
                        <div className="form-group">
                            <label>Full name</label>
                            <input
                                type="text"
                                name="fullName"
                                className="custom-input"
                                placeholder="Enter full name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
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
                                placeholder="........."
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="custom-input"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-admin-register" disabled={loading}>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
