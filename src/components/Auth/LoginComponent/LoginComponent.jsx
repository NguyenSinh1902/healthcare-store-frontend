import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import SocialLogin from '../SocialLogin';
import './LoginComponent.css';
import loginImg from '../../../assets/images/image_Login.png';
import { login } from '../../../services/authService';
import { loginStart, loginSuccess, loginFailed } from '../../../redux/slices/authSlice';
import { ArrowLeftOutlined } from '@ant-design/icons'; // 1. Import Icon

const LoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Dùng Hook useMessage thay vì message tĩnh (quan trọng cho Antd v5)
  const [messageApi, contextHolder] = message.useMessage();

  // Lấy thêm 'user' từ Redux để kiểm tra trạng thái đăng nhập
  const { isLoading, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- LOGIC MỚI: Chặn truy cập nếu đã đăng nhập ---
  useEffect(() => {
    if (user) {
      navigate('/'); // Nếu đã có user, đá về trang chủ ngay
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
      // Dòng sửa logic lấy data (như đã bàn ở trên)
      const data = res.data ? res.data : res;

      if (data && data.success) {
        // 1. CHỈ HIỆN THÔNG BÁO TRƯỚC
        messageApi.success("Đăng nhập thành công! Đang chuyển hướng...");

        // 2. ĐỢI 1.5s RỒI MỚI DISPATCH VÀ CHUYỂN TRANG
        setTimeout(() => {
          const userData = {
            email: email,
            role: data.role
          };
          // Lúc này mới cập nhật Redux -> useEffect mới chạy -> Chuyển trang
          dispatch(loginSuccess({ token: data.token, user: userData }));
          // navigate('/') // Không cần dòng này nữa vì useEffect sẽ tự làm
        }, 1500);

      } else {
        // Server trả về 200 nhưng báo lỗi (success: false)
        const errorMsg = data?.message || "Login failed";
        dispatch(loginFailed(errorMsg));
        messageApi.error(errorMsg);
      }
    } catch (error) {
      console.error("Login catch error:", error);

      // 3. Xử lý lỗi an toàn (tránh crash app)
      const serverError = error?.response?.data;
      const errorMessage = serverError?.message || "An error occurred during login.";

      dispatch(loginFailed(errorMessage));
      messageApi.error(errorMessage);
    }
  };

  // Nếu đang redirect, có thể return null để tránh nháy giao diện
  if (user) return null;

  return (
    <div className="login-page-wrapper">
      {/* 4. Đặt contextHolder ở đây để hiển thị thông báo */}
      {contextHolder}

      {/* 2. THÊM NÚT BACK TO HOME TẠI ĐÂY */}
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
                  type="password"
                  className="custom-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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