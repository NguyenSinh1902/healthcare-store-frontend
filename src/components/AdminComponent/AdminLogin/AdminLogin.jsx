import React, { useState } from 'react';
import './AdminLogin.css';
import loginImg from '../../../assets/images/image_Login.png';


const AdminLogin = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = e => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            console.log('Please fill in both fields');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            console.log('Login attempt completed');
        }, 1500);
    };


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