import React from 'react';
import { Layout, Button, theme } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminComponent/AdminSidebar/AdminSidebar';
import AdminUserList from '../../../components/AdminComponent/AdminUser/AdminUserList';
import AdminHeader from '../../../components/AdminComponent/AdminHeader/AdminHeader';

const { Header, Content } = Layout;

const AdminUserPage = () => {
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
                    <h2 style={{ marginBottom: 24 }}>User Management</h2>
                    <AdminUserList />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminUserPage;
