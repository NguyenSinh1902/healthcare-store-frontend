import React, { useState } from 'react';
import { Layout, Button, Input, Badge, Dropdown, Avatar, Space } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    BellOutlined,
    UserOutlined,
    LogoutOutlined,
    SettingOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';
import './AdminHeader.css';

const { Header } = Layout;

const AdminHeader = ({ collapsed, onToggleCollapse, colorBgContainer }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [searchValue, setSearchValue] = useState('');

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/login');
    };

    const handleSearch = (value) => {
        console.log('Search:', value);
        // TODO: Implement search functionality
    };

    // Account dropdown menu items
    const menuItems = [
        {
            key: 'profile',
            icon: <ProfileOutlined />,
            label: 'Profile',
            onClick: () => navigate('/admin/profile'),
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings',
            onClick: () => navigate('/admin/settings'),
        },
        {
            type: 'divider',
        }
    ];

    return (
        <Header className="admin-header" style={{ background: colorBgContainer }}>
            <div className="header-left">
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={onToggleCollapse}
                    className="toggle-btn"
                />
            </div>

            <div className="header-right">
                {/* Search Bar */}
                <Input
                    placeholder="Search..."
                    prefix={<SearchOutlined />}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onPressEnter={(e) => handleSearch(e.target.value)}
                    className="header-search"
                    style={{ width: 250 }}
                    allowClear
                />

                {/* Notification Icon */}
                <Badge count={5} className="header-notification">
                    <Button
                        type="text"
                        icon={<BellOutlined style={{ fontSize: '18px' }} />}
                        onClick={() => navigate('/admin/notifications')}
                    />
                </Badge>

                {/* Account Dropdown */}
                <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']}>
                    <Space className="header-account" style={{ cursor: 'pointer' }}>
                        <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
                        <span className="account-name">{user?.username || 'Admin'}</span>
                    </Space>
                </Dropdown>

                {/* Logout Button */}
                <Button
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    className="logout-btn"
                >
                    Logout
                </Button>
            </div>
        </Header>
    );
};

export default AdminHeader;
