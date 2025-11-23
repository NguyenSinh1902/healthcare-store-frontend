import React from 'react';
import { useNavigate } from 'react-router-dom';
import SocialLogin from '../SocialLogin';
import './LoginComponent.css';

import loginImg from '../../../assets/images/image_Login.png'; 

const LoginComponent = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">

        <div className="login-left-section">
            <div className="login-form-wrapper">
                <h2 className="login-title">Welcome Back!</h2>
                
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" className="custom-input" placeholder="Enter your username" />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="custom-input" placeholder="Enter your password" />
                    </div>
                    <button type="submit" className="btn-login">Login</button>
                </form>

                <div className="login-footer">
                    <span className="text-gray">Dont have an account? </span>
                    <span className="text-link" onClick={() => navigate('/register')}>Register</span>
                </div>

                <SocialLogin />
            </div>

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