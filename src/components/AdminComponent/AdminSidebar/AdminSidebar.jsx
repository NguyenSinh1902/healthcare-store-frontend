import React from 'react';
import { Layout, Menu } from 'antd';
import {
    PieChartOutlined,
    ShopOutlined,
    ShoppingOutlined,
    UserOutlined,
    TeamOutlined,
    TagsOutlined,
    MessageOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

const { Sider } = Layout;

const AdminSidebar = ({ collapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        {
            key: '/admin',
            icon: <PieChartOutlined />,
            label: 'Dashboard',
        },
        {
            key: 'products',
            icon: <ShopOutlined />,
            label: 'Products',
            children: [
                { key: '/admin/products', label: 'All Products' },
                { key: '/admin/categories', label: 'Categories' },
            ],
        },
        {
            key: '/admin/orders',
            icon: <ShoppingOutlined />,
            label: 'Orders',
        },
        {
            key: '/admin/customers',
            icon: <UserOutlined />,
            label: 'Customers',
        },
        {
            key: '/admin/staff',
            icon: <TeamOutlined />,
            label: 'Staff',
        },
        {
            key: 'marketing',
            icon: <TagsOutlined />,
            label: 'Marketing',
            children: [
                { key: '/admin/coupons', label: 'Coupons' },
            ],
        },
        {
            key: '/admin/feedbacks',
            icon: <MessageOutlined />,
            label: 'Feedbacks',
        },
        {
            key: '/admin/settings',
            icon: <SettingOutlined />,
            label: 'Settings',
        },
    ];

    const onClick = (e) => {
        navigate(e.key);
    };

    // Determine selected key based on current path
    const selectedKey = location.pathname;
    // Determine open keys (submenus) based on current path
    const defaultOpenKeys = [];
    if (selectedKey.includes('/products') || selectedKey.includes('/categories')) {
        defaultOpenKeys.push('products');
    }
    if (selectedKey.includes('/coupons')) {
        defaultOpenKeys.push('marketing');
    }

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} className="admin-sidebar">
            <div className="admin-logo-vertical">
                {collapsed ? 'HS' : 'Healthcare Store'}
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[selectedKey]}
                defaultOpenKeys={defaultOpenKeys}
                items={items}
                onClick={onClick}
            />
        </Sider>
    );
};

export default AdminSidebar;
