import React from 'react';
import { useNavigate } from 'react-router-dom';
import SocialLogin from '../SocialLogin';
import './RegisterComponent.css';
import registerImg from '../../../assets/images/image_Register.png';

const RegisterComponent = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-container">

        <div className="register-left-section">

             <div className="dec-shape-reg shape-reg-1"></div>
             <div className="dec-shape-reg shape-reg-2"></div>

             <img src={registerImg} alt="Register Illustration" className="register-floating-img" />
        </div>

        <div className="register-right-section">
            <div className="register-form-wrapper">
                <h2 className="register-title">Please Fill out form to Register!</h2>
                
                <form className="register-form" onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Full name:</label>
                        <input type="text" className="custom-input" placeholder="Enter your full name" />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" className="custom-input" placeholder="sieusayan@gmail.com" />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="custom-input" placeholder="........." />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input type="password" className="custom-input" placeholder="Confirm your password" />
                    </div>
                    <button type="submit" className="btn-register">Sign Up</button>
                </form>

                <div className="register-footer">
                    <span className="text-gray">Yes i have an account? </span>
                    <span className="text-link" onClick={() => navigate('/login')}>Login</span>
                </div>

                <div style={{width: "382px",display: "flex",justifyContent:"center"}}>
                  <SocialLogin />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterComponent;