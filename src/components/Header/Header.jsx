import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import "./Header.css";
import logo from "../../assets/images/logo-GreenPlus.png";
import iconSearch from "../../assets/images/icon_search.png";
import iconCategory from "../../assets/images/tabler_category.png";
import iconBell from "../../assets/images/icon-notification.png";
import iconCart from "../../assets/images/icon-cart.png";
import iconAccount from "../../assets/images/icon-account.png";
import bxMap from "../../assets/images/bx_map.png";
import weuiBack from "../../assets/images/weui_back-outlined.png";

// Ant Design Icons cho đẹp
import { UserOutlined, FileTextOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';

import ButtonCategory from "../ButtonCategory/ButtonCategory";
import Search from "../Search/Search";

const Header = () => {
  const [showCategory, setShowCategory] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get auth state from Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleCloseAll = () => {
    setShowCategory(false);
    setShowSearch(false);
    setShowNotifications(false);
    setShowUserMenu(false);
  };

  const handleCloseCategory = () => {
    setShowCategory(false);
  };

  const handleGoHome = () => {
    navigate("/");
    handleCloseAll();
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseAll();
    navigate('/login');
  };

  // Hàm toggle cho Notification
  const toggleNotifications = (e) => {
    e.stopPropagation();
    const current = showNotifications;
    handleCloseAll(); // Đóng hết cái khác
    setShowNotifications(!current); // Bật/tắt cái này
  };

  // Hàm toggle cho User Menu
  const toggleUserMenu = (e) => {
    e.stopPropagation();
    const current = showUserMenu;
    handleCloseAll();
    setShowUserMenu(!current);
  };

  return (
    <>
      {/* Overlay tối màn hình */}
      {(showCategory || showSearch || showNotifications || showUserMenu) && (
        <div className="menu-overlay" onClick={handleCloseAll}></div>
      )}

      <header className="header">
        <div className="header__outer">
          <div className="header__inner">

            {/* --- LOGO --- */}
            <div
              className="header__logo"
              onClick={handleGoHome}
              style={{ cursor: "pointer" }}
            >
              <img src={logo} alt="GreenPlus" className="logo-img" />
              <h2 className="logo-text">GreenPlus</h2>
            </div>

            {/* --- CATEGORY --- */}
            <div
              className="header__category"
              onClick={(e) => {
                e.stopPropagation();
                const current = showCategory;
                handleCloseAll();
                setShowCategory(!current);
              }}
              style={{ cursor: "pointer", position: "relative", zIndex: showCategory ? 1001 : "auto" }}
            >
              <img src={iconCategory} alt="Category" className="icon" />
              <span>Category</span>
              <img
                src={weuiBack}
                alt="Arrow"
                className="icon_show"
                style={{
                  transform: showCategory ? "rotate(-90deg)" : "rotate(0deg)",
                  transition: "0.3s",
                }}
              />
              {showCategory && (
                <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 1000 }} onClick={(e) => e.stopPropagation()}>
                  <ButtonCategory onClose={handleCloseCategory} />
                </div>
              )}
            </div>

            {/* --- SEARCH --- */}
            <div
              className="header__search"
              onClick={(e) => {
                e.stopPropagation();
                setShowSearch(true);
                setShowCategory(false);
                setShowNotifications(false);
                setShowUserMenu(false);
              }}
              style={{ position: "relative", zIndex: showSearch ? 1001 : "auto" }}
            >
              <img src={iconSearch} alt="Search" className="icon-search" />
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  handleCloseAll();
                  setShowSearch(true);
                }}
              />
              {showSearch && <Search query={searchQuery} onClose={handleCloseAll} />}
            </div>

            {/* --- LOCATION --- */}
            <div className="header__location">
              <img src={bxMap} alt="Location" className="icon" />
              <span>TP.HCM</span>
              <img src={weuiBack} alt="Arrow" className="icon_show" />
            </div>

            {/* --- ACTIONS --- */}
            <div className="header__actions">

              {/* 1. NOTIFICATION */}
              <div className="action-item-wrapper" onClick={toggleNotifications}>
                <img src={iconBell} alt="Notification" className="action-icon-img" />
                {/* Badge giả lập (chấm đỏ) */}
                <div className="notification-badge">2</div>

                {/* DROPDOWN NOTIFICATION */}
                {showNotifications && (
                  <div className="dropdown-menu notification-dropdown" onClick={(e) => e.stopPropagation()}>
                    <div className="dropdown-header">Notifications</div>
                    <div className="dropdown-content">
                      <div className="noti-item unread">
                        <div className="noti-title">Order #123321 delivered</div>
                        <div className="noti-desc">Your package has been delivered successfully.</div>
                        <div className="noti-time">5 min ago</div>
                      </div>
                      <div className="noti-item">
                        <div className="noti-title">Big Sale 50% Off!</div>
                        <div className="noti-desc">Don't miss out on our biggest sale of the year.</div>
                        <div className="noti-time">1 day ago</div>
                      </div>
                    </div>
                    <div className="dropdown-footer">View all</div>
                  </div>
                )}
              </div>

              {/* 2. CART */}
              <div className="action-item-wrapper" onClick={() => { navigate("/cart"); handleCloseAll(); }}>
                <img src={iconCart} alt="Cart" className="action-icon-img" />
              </div>

              {/* 3. USER ACCOUNT */}
              <div className="action-item-wrapper" onClick={toggleUserMenu}>
                <img src={iconAccount} alt="User" style={{ width: "28px" }} className="action-icon-img" />

                {/* DROPDOWN USER MENU */}
                {showUserMenu && (
                  <div className="dropdown-menu user-dropdown" onClick={(e) => e.stopPropagation()}>

                    {isAuthenticated ? (
                      <>
                        {/* User Info Mini */}
                        <div className="user-mini-profile" style={{ padding: '0 20px' }}>
                          <img src="https://placehold.co/48x48" alt="Avatar" />
                          <div>
                            <div className="user-name">{user?.fullName || user?.email || "User"}</div>
                            <div className="user-email">{user?.email}</div>
                          </div>
                        </div>

                        <div className="dropdown-divider"></div>

                        {/* Menu Links */}
                        <div className="user-menu-list">
                          <div className="user-menu-item" onClick={() => { navigate('/account/details'); handleCloseAll(); }}>
                            <UserOutlined /> Account Details
                          </div>
                          <div className="user-menu-item" onClick={() => { navigate('/account/orders'); handleCloseAll(); }}>
                            <FileTextOutlined /> My Orders
                          </div>
                          <div className="user-menu-item">
                            <SettingOutlined /> Settings
                          </div>
                        </div>

                        <div className="dropdown-divider"></div>

                        <div className="user-menu-item logout" onClick={handleLogout}>
                          <LogoutOutlined /> Logout
                        </div>
                      </>
                    ) : (
                      /* --- GUEST VIEW --- */
                      <div className="guest-view">
                        <div className="guest-header">
                          <p className="guest-welcome">Welcome to GreenPlus</p>
                          <p className="guest-sub">Sign in to track orders & collect vouchers.</p>
                        </div>

                        <div className="guest-actions">
                          <button className="btn-login-full" onClick={() => { navigate('/login'); handleCloseAll(); }}>
                            Log In
                          </button>

                          <div className="guest-register-row">
                            <span>New customer? </span>
                            <span className="link-register" onClick={() => { navigate('/register'); handleCloseAll(); }}>
                              Sign Up
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;