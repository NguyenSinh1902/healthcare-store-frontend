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

<<<<<<< HEAD
=======
const submenuKeys = ['products', 'orders', 'marketing'];

>>>>>>> origin/feature/admin-order-fe
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
<<<<<<< HEAD
            key: '/admin/orders',
            icon: <ShoppingOutlined />,
            label: 'Orders',
=======
            key: 'orders', 
            icon: <ShoppingOutlined />,
            label: 'Orders',
            children: [
                { key: '/admin/orders', label: 'All Orders' },
                { key: '/admin/orders/pending', label: 'Pending Orders' }, 
            ],
>>>>>>> origin/feature/admin-order-fe
        },
        {
            key: '/admin/customers',
            icon: <UserOutlined />,
            label: 'Customers',
        },
<<<<<<< HEAD
=======

>>>>>>> origin/feature/admin-order-fe
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
<<<<<<< HEAD
=======

>>>>>>> origin/feature/admin-order-fe
    ];

    const onClick = (e) => {
        navigate(e.key);
    };

<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> origin/feature/admin-coupon-fe
    const selectedKey = location.pathname;

    const defaultOpenKeys = [];
    if (selectedKey.includes('/products') || selectedKey.includes('/categories')) {
        defaultOpenKeys.push('products');
    }
    if (selectedKey.includes('/coupons')) {
        defaultOpenKeys.push('marketing');
    }
=======
    const selectedKey = location.pathname;

    const defaultOpenKeys = submenuKeys.filter(key => selectedKey.includes(`/${key}`));
>>>>>>> origin/feature/admin-order-fe

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
