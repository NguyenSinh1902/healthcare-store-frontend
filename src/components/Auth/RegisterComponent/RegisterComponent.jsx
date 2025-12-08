import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useSelector } from 'react-redux';

import SocialLogin from '../SocialLogin';
import './RegisterComponent.css';
import registerImg from '../../../assets/images/image_Register.png';
import { register } from '../../../services/authService';
import { ArrowLeftOutlined } from '@ant-design/icons';

const RegisterComponent = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const [messageApi, contextHolder] = message.useMessage();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
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

    // 1. Validate Client
    if (formData.password !== formData.confirmPassword) {
      messageApi.error('Confirm Password does not match!');
      return;
    }

    setLoading(true);
    try {
      console.log("Start Register Request...");

      // 2. Gọi API
      const res = await register(
        formData.fullName,
        formData.email,
        formData.password,
        formData.confirmPassword
      );

      console.log("Response Full:", res);

      const data = res;
      if (data && data.success) {
        messageApi.success('Registration successful! Please login.');
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {

        messageApi.error(data?.message || 'Registration failed');
      }

    } catch (error) {
      console.error("Lỗi Catch:", error);

      const serverError = error?.response?.data;

      if (serverError) {
        if (serverError.errors && Array.isArray(serverError.errors)) {
          serverError.errors.forEach(err => {
            messageApi.error(err.message);
          });
        }
        else if (serverError.message) {
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

  if (user) return null;

  return (
    <div className="register-page-wrapper">

      {contextHolder}


      <div className="register-container">
        <div className="register-left-section">
          <div className="dec-shape-reg shape-reg-1" />
          <div className="dec-shape-reg shape-reg-2" />
          <img src={registerImg} alt="Register Illustration" className="register-floating-img" />
        </div>
        <div className="register-right-section">
          <div className="register-form-wrapper">
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
            <div className="register-footer">
              <span className="text-gray">Yes i have an account? </span>
              <span className="text-link" onClick={() => navigate('/login')}>Login</span>
            </div>
            <div style={{ width: '382px', display: 'flex', justifyContent: 'center' }}>
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;