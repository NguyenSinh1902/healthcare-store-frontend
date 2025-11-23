import React from 'react';
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
import './AccountSidebar.css';

const AccountSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

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

    return (
        <div className="sidebar-wrapper">

            <div className="sidebar-group main-group">

                <div className="user-info">
                    <img src="https://placehold.co/48x48" alt="User" className="user-avatar" />
                    <span className="user-name">Sinh Le</span>
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
                <div className="menu-item logout">
                    <span className="menu-icon"><LogoutOutlined /></span>
                    <span className="menu-label">Logout</span>
                </div>
            </div>

        </div>
    );
};

export default AccountSidebar;