import React from 'react';
import { Layout, Button, theme, Card, Row, Col } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    DollarCircleOutlined,
    ShoppingOutlined,
    UserOutlined,
    AppstoreOutlined,
    ArrowUpOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import './Dashboard.css';
import AdminSidebar from '../../../components/AdminComponent/AdminSidebar/AdminSidebar';

const { Header, Content } = Layout;

// Mock Data
const kpiData = [
    { title: 'Total Revenue', value: '$85,000', growth: '+12%', icon: <DollarCircleOutlined />, color: '#52c41a' },
    { title: 'Total Orders', value: '4,500', growth: '+3%', icon: <ShoppingOutlined />, color: '#1890ff' },
    { title: 'Total Customers', value: '15,200', growth: '+6%', icon: <UserOutlined />, color: '#722ed1' },
    { title: 'Total Products', value: '980', growth: '+0%', icon: <AppstoreOutlined />, color: '#faad14' },
];

const monthlyData = [
    { name: 'Jan', revenue: 4000, orders: 240 },
    { name: 'Feb', revenue: 3000, orders: 139 },
    { name: 'Mar', revenue: 2000, orders: 980 },
    { name: 'Apr', revenue: 2780, orders: 390 },
    { name: 'May', revenue: 1890, orders: 480 },
    { name: 'Jun', revenue: 2390, orders: 380 },
    { name: 'Jul', revenue: 3490, orders: 430 },
];

const categoryData = [
    { name: 'Supplements', value: 400 },
    { name: 'Equipment', value: 300 },
    { name: 'Personal Care', value: 300 },
    { name: 'Medicine', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
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
                {/* Header Section (Code from Commit 1) */}
                <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '20px' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Button icon={<LogoutOutlined />} onClick={handleLogout}>
                        Logout
                    </Button>
                </Header>

                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: 'transparent',
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {/* KPI Cards */}
                    <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                        {kpiData.map((item, index) => (
                            <Col xs={24} sm={12} lg={6} key={index}>
                                <Card bordered={false} className="kpi-card">
                                    <div className="kpi-icon-wrapper" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                                        {item.icon}
                                    </div>
                                    <div className="kpi-content">
                                        <p className="kpi-title">{item.title}</p>
                                        <h3 className="kpi-value">{item.value}</h3>
                                        <span className="kpi-growth">
                                            <ArrowUpOutlined /> {item.growth}
                                        </span>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Charts Section */}
                    <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                        <Col xs={24} lg={16}>
                            <Card title="Revenue & Orders Trend" bordered={false} className="chart-card">
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={monthlyData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis yAxisId="left" />
                                        <YAxis yAxisId="right" orientation="right" />
                                        <Tooltip />
                                        <Legend />
                                        <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card>
                        </Col>
                        <Col xs={24} lg={8}>
                            <Card title="Top Categories" bordered={false} className="chart-card">
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;