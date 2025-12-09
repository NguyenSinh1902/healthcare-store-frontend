import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useSelector } from 'react-redux';

import SocialLogin from '../SocialLogin';
import './RegisterComponent.css';
import registerImg from '../../../assets/images/image_Register.png';
import { register, verifyAccount } from '../../../services/authService';
import { ArrowLeftOutlined } from '@ant-design/icons';

const RegisterComponent = () => {
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

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async e => {
    e.preventDefault();

    // Validate Client
    if (formData.password !== formData.confirmPassword) {
      messageApi.error('Confirm Password does not match!');
      return;
    }

    setLoading(true);
    try {
      const res = await register(
        formData.fullName,
        formData.email,
        formData.password,
        formData.confirmPassword
      );

      const data = res;

      if (data && data.success) {
        messageApi.success(data.message || 'Registration successful! Please check your email to verify account.');
        setRegisteredEmail(data.email || formData.email);
        setStep('verify'); // Move to verification step
      } else {
        messageApi.error(data?.message || 'Registration failed');
      }

    } catch (error) {
      console.error("Registration Error:", error);

      const serverError = error?.response?.data;

      if (serverError) {
        if (serverError.errors && Array.isArray(serverError.errors)) {
          serverError.errors.forEach(err => {
            messageApi.error(err.message);
          });
        } else if (serverError.message) {
          messageApi.error(serverError.message);
        } else {
          messageApi.error('Unknown error from server.');
        }
      } else {
        messageApi.error('Cannot connect to server. Please check your network.');
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
      const res = await verifyAccount(registeredEmail, parseInt(verificationCode));
      const data = res;

      if (data && data.success) {
        messageApi.success(data.message || 'Account verified successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        messageApi.error(data?.message || 'Verification failed');
      }

    } catch (error) {
      console.error("Verification Error:", error);

      const serverError = error?.response?.data;

      if (serverError?.message) {
        messageApi.error(serverError.message);
      } else {
        messageApi.error('Verification failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    try {
      // Re-register to resend code
      const res = await register(
        formData.fullName,
        registeredEmail,
        formData.password,
        formData.confirmPassword
      );

      const data = res;

      if (data && data.success) {
        messageApi.success('Verification code resent! Please check your email.');
      } else {
        messageApi.error(data?.message || 'Failed to resend code');
      }
    } catch (error) {
      console.error("Resend Error:", error);
      messageApi.error('Failed to resend verification code');
    } finally {
      setLoading(false);
    }
  };

  if (user) return null;

  return (
    <div className="register-page-wrapper">
      {contextHolder}

      <div className="back-home-btn" onClick={() => navigate('/')}>
        <ArrowLeftOutlined className="back-icon" />
        <span>Back to Home</span>
      </div>

      <div className="register-container">
        <div className="register-left-section">
          <div className="dec-shape-reg shape-reg-1" />
          <div className="dec-shape-reg shape-reg-2" />
          <img src={registerImg} alt="Register Illustration" className="register-floating-img" />
        </div>

        <div className="register-right-section">
          <div className="register-form-wrapper">
            {step === 'register' ? (
              <>
                <h2 className="register-title">Please Fill out form to Register!</h2>
                <form className="register-form" onSubmit={handleRegister}>
                  <div className="form-group">
                    <label>Full name:</label>
                    <input
                      type="text"
                      name="fullName"
                      className="custom-input"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      className="custom-input"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
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
                    <label>Confirm Password:</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="custom-input"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-register" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="register-title">Verify Your Email</h2>
                <p className="verify-description">
                  We've sent a verification code to <strong>{registeredEmail}</strong>
                </p>
                <form className="register-form" onSubmit={handleVerify}>
                  <div className="form-group">
                    <label>Verification Code:</label>
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
                  <button type="submit" className="btn-register" disabled={loading}>
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

            <div className="register-footer">
              <span className="text-gray">Yes i have an account? </span>
              <span className="text-link" onClick={() => navigate('/login')}>Login</span>
            </div>

            {step === 'register' && (
              <div style={{ width: '382px', display: 'flex', justifyContent: 'center' }}>
                <SocialLogin />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;