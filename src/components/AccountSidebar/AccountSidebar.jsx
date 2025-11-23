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

    const menuItems = [
        {
            group: "Main",
            items: [
                { key: '/account/details', label: 'Account Details', icon: <UserOutlined /> },
                { key: '/account/orders', label: 'My Orders', icon: <FileTextOutlined /> },
                { key: '/cart', label: 'My Cart', icon: <ShoppingCartOutlined /> },
                { key: '/account/addresses', label: 'My Addresses', icon: <EnvironmentOutlined /> },
                { key: '/account/payments', label: 'My Payments', icon: <CreditCardOutlined /> },
                { key: '/account/notifications', label: 'Notification Setting', icon: <BellOutlined /> },
                { key: '/account/refer', label: 'Refer Friends', icon: <GiftOutlined /> },
                { key: '/account/coupons', label: 'Coupons', icon: <TagsOutlined /> },
                { key: '/account/recipes', label: 'My Recipes', icon: <ReadOutlined /> },
            ]
        },
        {
            group: "Settings",
            items: [
                { key: '/account/settings', label: 'Account Settings', icon: <SettingOutlined /> },
                { key: '/account/help', label: 'Help Center', icon: <QuestionCircleOutlined /> },
            ]
        }
    ];

    const handleNavigate = (path) => {
        navigate(path);
    };

    const renderMenuItems = (group) => (
        <div className="menu-list">
            {group.items.map((item) => {
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
    );

    return (
        <div className="sidebar-wrapper">
            <div className="sidebar-header">
                <div className="user-info">
                    <img src="https://placehold.co/48x48" alt="User" className="user-avatar" />
                    <span className="user-name">Sinh Le</span>
                </div>
            </div>

            {menuItems.map((group, index) => (
                <div key={index} className="sidebar-group">
                    <div className="group-title">{group.group}</div>
                    {renderMenuItems(group)}
                    {index < menuItems.length - 1 && <div className="menu-divider"></div>}
                </div>
            ))}

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
