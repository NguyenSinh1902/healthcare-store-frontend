import React, { useState } from 'react';
import './AdminRegister.css';

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
            console.log('Registration attempt with data:', formData);
        }, 1000);
    };

    return (
        <div className="admin-register-wrapper">
            <div className="admin-register-container basic">
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
                            placeholder="Email"
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
                            placeholder="Password"
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
    );
};

export default AdminRegister;