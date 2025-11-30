import React, { useState } from 'react';
import './AdminRegister.css';
import registerImg from '../../../assets/images/image_Register.png';

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = e => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            console.log('Passwords do not match!');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            console.log('Registration attempt completed');
        }, 1500);
    };

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