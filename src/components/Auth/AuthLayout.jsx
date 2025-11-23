import React from "react";
import "./AuthLayout.css";

const AuthLayout = ({ children, illustration }) => {
  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <div className="auth-form-section">
          <div className="auth-form-wrapper">{children}</div>

          <div className="decorative-shape shape-1"></div>
          <div className="decorative-shape shape-2"></div>
        </div>

        <div className="auth-purple-section"></div>

        <img
          src={illustration}
          alt="Auth Illustration"
          className="auth-floating-img"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
