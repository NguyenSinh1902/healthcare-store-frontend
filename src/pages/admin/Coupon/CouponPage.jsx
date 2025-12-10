import React from 'react';
import { Layout, Button, theme } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminComponent/AdminSidebar/AdminSidebar';
import AdminCouponList from '../../../components/AdminComponent/AdminCoupon/AdminCouponList';
import AdminHeader from '../../../components/AdminComponent/AdminHeader/AdminHeader';
const { Header, Content } = Layout;

const CouponPage = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/admin/login');
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AdminSidebar collapsed={collapsed} />
            <Layout>
                <AdminHeader
                    collapsed={collapsed}
                    onToggleCollapse={() => setCollapsed(!collapsed)}
                    colorBgContainer={colorBgContainer}
                />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: 'transparent',
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <h2 style={{ marginBottom: 24 }}>Coupon Management</h2>
                    <AdminCouponList />
                </Content>
            </Layout>
        </Layout>
    );
};

export default CouponPage;
