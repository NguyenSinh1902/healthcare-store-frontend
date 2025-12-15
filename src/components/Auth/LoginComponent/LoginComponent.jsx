import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import SocialLogin from '../SocialLogin';
import './LoginComponent.css';
import loginImg from '../../../assets/images/image_Login.png';
import { login } from '../../../services/authService';
import { loginStart, loginSuccess, loginFailed } from '../../../redux/slices/authSlice';
import { ArrowLeftOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const LoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      messageApi.error("Please enter both email and password");
      return;
    }

    dispatch(loginStart());
    try {
      console.log("Start Login...");
      const res = await login(email, password);

      const data = res.data ? res.data : res;

      if (data && data.success) {

        messageApi.success("Login successful! Redirecting...");

        setTimeout(() => {
          const userData = {
            email: email,
            role: data.role
          };

          dispatch(loginSuccess({ token: data.token, user: userData }));

        }, 1500);

      } else {

        const errorMsg = data?.message || "Login failed";
        dispatch(loginFailed(errorMsg));
        messageApi.error(errorMsg);
      }
    } catch (error) {
      console.error("Login catch error:", error);

      const serverError = error?.response?.data;
      const errorMessage = serverError?.message || "An error occurred during login.";

      dispatch(loginFailed(errorMessage));
      messageApi.error(errorMessage);
    }
  };

  if (user) return null;

  return (
    <div className="login-page-wrapper">

      {contextHolder}

      <div className="back-home-btn" onClick={() => navigate('/')}>
        <ArrowLeftOutlined className="back-icon" />
        <span>Back to Home</span>
      </div>

      <div className="login-container">

        <div className="login-left-section">
          <div className="login-form-wrapper">
            <h2 className="login-title">Welcome Back!</h2>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  className="custom-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="custom-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                </span>
              </div>
              <button type="submit" className="btn-login" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="login-footer">
              <span className="text-gray">Dont have an account? </span>
              <span className="text-link" onClick={() => navigate('/register')}>Register</span>
            </div>

            <SocialLogin />
          </div>

          {/* Lấy hiệu ứng bên PaymentSuccessPage.jsx */}
          <div className="decorative-shape shape-1"></div>
          <div className="decorative-shape shape-2"></div>
        </div>

        <div className="login-right-section">
          <img src={loginImg} alt="Login Illustration" className="login-floating-img" />
        </div>

      </div>
    </div>
  );
};

export default LoginComponent;