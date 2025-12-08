import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    UserOutlined,
    FileTextOutlined,
    ShoppingCartOutlined,
    EnvironmentOutlined,
    CreditCardOutlined,
    BellOutlined,
    GiftOutlined,
    TagsOutlined,
    ReadOutlined,
    SettingOutlined,
    QuestionCircleOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { getProfile } from '../../services/profileService';
import './AccountSidebar.css';

const AccountSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getProfile();
                if (response && response.success) {
                    setUserProfile(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch sidebar profile", error);
            }
        };
        fetchUserProfile();
    }, []);

    const mainMenuItems = [
        { key: '/account/details', label: 'Account Details', icon: <UserOutlined /> },
        { key: '/account/orders', label: 'My Orders', icon: <FileTextOutlined /> },
        { key: '/cart', label: 'My Cart', icon: <ShoppingCartOutlined /> },
        { key: '/account/addresses', label: 'My Addresses', icon: <EnvironmentOutlined /> },
        { key: '/account/payments', label: 'My Payments', icon: <CreditCardOutlined /> },
        { key: '/account/notifications', label: 'Notification Setting', icon: <BellOutlined /> },
        { key: '/account/refer', label: 'Refer Friends', icon: <GiftOutlined /> },
        { key: '/account/coupons', label: 'Coupons', icon: <TagsOutlined /> },
        { key: '/account/recipes', label: 'My Recipes', icon: <ReadOutlined /> },
    ];

    const settingsMenuItems = [
        { key: '/account/settings', label: 'Account Settings', icon: <SettingOutlined /> },
        { key: '/account/help', label: 'Help Center', icon: <QuestionCircleOutlined /> },
    ];

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="sidebar-wrapper">

            <div className="sidebar-group main-group">

                <div className="user-info">
                    <img
                        src={userProfile?.avatarUrl || "https://placehold.co/48x48"}
                        alt="User"
                        className="user-avatar"
                    />
                    <span className="user-name">{userProfile?.fullName || 'User'}</span>
                </div>

                <div className="menu-list">
                    {mainMenuItems.map((item) => {
                        const isActive = location.pathname === item.key;
                        return (
                            <div
                                key={item.key}
                                className={`menu-item ${isActive ? 'active' : ''}`}
                                onClick={() => handleNavigate(item.key)}
                            >
                                <span className="menu-icon">{item.icon}</span>
                                <span className="menu-label">{item.label}</span>
                            </div>
                        );
                    })}
                </div>

                <div className="menu-divider"></div>

                <div className="menu-list">
                    {settingsMenuItems.map((item) => {
                        const isActive = location.pathname === item.key;
                        return (
                            <div
                                key={item.key}
                                className={`menu-item ${isActive ? 'active' : ''}`}
                                onClick={() => handleNavigate(item.key)}
                            >
                                <span className="menu-icon">{item.icon}</span>
                                <span className="menu-label">{item.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="sidebar-group logout-group">
                <div className="menu-item logout" onClick={handleLogout}>
                    <span className="menu-icon"><LogoutOutlined /></span>
                    <span className="menu-label">Logout</span>
                </div>
            </div>

        </div>
    );
};

export default AccountSidebar;