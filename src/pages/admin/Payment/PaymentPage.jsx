import React from 'react';
import { Layout, theme } from 'antd';
import AdminSidebar from '../../../components/AdminComponent/AdminSidebar/AdminSidebar';
import AdminHeader from '../../../components/AdminComponent/AdminHeader/AdminHeader';
import AdminPaymentManagement from '../../../components/AdminComponent/AdminPayment/AdminPaymentManagement';

const { Content } = Layout;

const AdminPaymentPage = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

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
                    <AdminPaymentManagement />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPaymentPage;
