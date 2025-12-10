import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import './AdminRegister.css';
import registerImg from '../../../assets/images/image_Register.png';
import { register, verifyAccount } from '../../../services/authService';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const AdminRegister = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const [messageApi, contextHolder] = message.useMessage();

    const [step, setStep] = useState('register'); // 'register' or 'verify'
    const [registeredEmail, setRegisteredEmail] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [verificationCode, setVerificationCode] = useState('');
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (user?.role === 'ADMIN' || user?.role === 'admin') {
            navigate('/admin');
        }
    }, [user, navigate]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async e => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            messageApi.error('Passwords do not match!');
            return;
        }
        setLoading(true);
        try {
            const response = await register(
                formData.fullName,
                formData.email,
                formData.password,
                formData.confirmPassword,
                'ADMIN'
            );

            if (response && response.success) {
                messageApi.success(response.message || 'Registration successful! Please check your email to verify account.');
                setRegisteredEmail(response.email || formData.email);
                setStep('verify');
            } else if (response && response.errors) {
                response.errors.forEach(err => messageApi.error(err.message));
            } else {
                messageApi.error(response?.message || 'Registration failed');
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                error.response.data.errors.forEach(err => messageApi.error(err.message));
            } else {
                messageApi.error(error.response?.data?.message || 'An error occurred during registration.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async e => {
        e.preventDefault();
        if (!verificationCode) {
            messageApi.error('Please enter verification code');
            return;
        }
        setLoading(true);
        try {
            const response = await verifyAccount(registeredEmail, parseInt(verificationCode));

            if (response && response.success) {
                messageApi.success(response.message || 'Account verified successfully!');
                setTimeout(() => {
                    navigate('/admin/login');
                }, 1500);
            } else {
                messageApi.error(response?.message || 'Verification failed');
            }
        } catch (error) {
            console.error("Verification Error:", error);
            messageApi.error(error.response?.data?.message || 'Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setLoading(true);
        try {
            const response = await register(
                formData.fullName,
                registeredEmail,
                formData.password,
                formData.confirmPassword,
                'ADMIN'
            );

            if (response && response.success) {
                messageApi.success('Verification code resent! Please check your email.');
            } else {
                messageApi.error(response?.message || 'Failed to resend code');
            }
        } catch (error) {
            messageApi.error('Failed to resend verification code');
        } finally {
            setLoading(false);
        }
    };

    // Prevent rendering if already redirected
    if (user?.role === 'ADMIN' || user?.role === 'admin') return null;

    return (
        <div className="admin-register-wrapper">
            {contextHolder}
            <div className="admin-register-container">
                <div className="admin-register-left">
                    <div className="admin-dec-shape shape-1" />
                    <div className="admin-dec-shape shape-2" />
                    <img src={registerImg} alt="Admin Register" className="admin-register-img" />
                </div>

                <div className="admin-register-right">
                    <div className="admin-register-form-wrapper">
                        {step === 'register' ? (
                            <>
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
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className="custom-input"
                                            placeholder="........."
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <span
                                            className="password-toggle-icon"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            className="custom-input"
                                            placeholder="Confirm password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                        <span
                                            className="password-toggle-icon"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                                        </span>
                                    </div>
                                    <button type="submit" className="btn-admin-register" disabled={loading}>
                                        {loading ? 'Signing Up...' : 'Sign Up'}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <h2 className="admin-register-title">Verify Your Email</h2>
                                <p className="verify-description">
                                    We've sent a verification code to <strong>{registeredEmail}</strong>
                                </p>
                                <form className="admin-register-form" onSubmit={handleVerify}>
                                    <div className="form-group">
                                        <label>Verification Code</label>
                                        <input
                                            type="text"
                                            className="custom-input"
                                            placeholder="Enter 6-digit code"
                                            value={verificationCode}
                                            onChange={(e) => setVerificationCode(e.target.value)}
                                            required
                                            maxLength={6}
                                        />
                                    </div>
                                    <button type="submit" className="btn-admin-register" disabled={loading}>
                                        {loading ? 'Verifying...' : 'Verify Account'}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-resend"
                                        onClick={handleResendCode}
                                        disabled={loading}
                                    >
                                        Resend Code
                                    </button>
                                </form>
                            </>
                        )}

                        <div className="admin-register-footer">
                            <span className="text-gray">Yes i have an account? </span>
                            <span className="text-link" onClick={() => navigate('/admin/login')}>Login</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
