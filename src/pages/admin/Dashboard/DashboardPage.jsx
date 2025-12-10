import React, { useState, useEffect } from 'react';
import { Layout, theme, Card, Row, Col, Table, Tag, Spin, message } from 'antd';
import {
  DollarCircleOutlined,
  ShoppingOutlined,
  UserOutlined,
  AppstoreOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
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
import AdminHeader from '../../../components/AdminComponent/AdminHeader/AdminHeader';
import {
  getStats,
  getTrend,
  getCategoryDistribution,
  getRecentOrders,
  getTopProducts
} from '../../../services/dashboardService';

const { Content } = Layout;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, trendRes, categoryRes, ordersRes, productsRes] = await Promise.all([
        getStats(),
        getTrend(),
        getCategoryDistribution(),
        getRecentOrders(),
        getTopProducts()
      ]);

      // Stats
      if (statsRes?.success && statsRes.data) {
        setStats(statsRes.data);
      }

      // Trend data - transform for chart
      if (trendRes?.success && trendRes.data) {
        const transformed = trendRes.data.map(item => ({
          name: `Month ${item.label}`,
          revenue: item.value,
          orders: item.count
        }));
        setTrendData(transformed);
      }

      // Category distribution - transform for pie chart
      if (categoryRes?.success && categoryRes.data) {
        const transformed = categoryRes.data.map(item => ({
          name: item.label,
          value: item.value
        }));
        setCategoryData(transformed);
      }

      // Recent orders - transform for table
      if (ordersRes?.success && ordersRes.data) {
        const transformed = ordersRes.data.map((order, index) => ({
          key: index,
          id: `#ORD-${order.idOrder}`,
          customer: `User #${order.idUser}`,
          total: `$${order.finalAmount.toFixed(2)}`,
          status: order.status,
          orderDate: new Date(order.orderDate).toLocaleDateString()
        }));
        setRecentOrders(transformed);
      }

      // Top products - transform for table
      if (productsRes?.success && productsRes.data) {
        const transformed = productsRes.data.map((product, index) => ({
          key: index,
          name: product.productName,
          sold: product.soldQuantity,
          price: `$${product.price.toFixed(2)}`,
          image: product.image
        }));
        setTopProducts(transformed);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      message.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // KPI Data
  const kpiData = stats ? [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      growth: '+0%',
      icon: <DollarCircleOutlined />,
      color: '#52c41a'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      growth: '+0%',
      icon: <ShoppingOutlined />,
      color: '#1890ff'
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers.toLocaleString(),
      growth: '+0%',
      icon: <UserOutlined />,
      color: '#722ed1'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toLocaleString(),
      growth: '+0%',
      icon: <AppstoreOutlined />,
      color: '#faad14'
    },
  ] : [];

  const orderColumns = [
    { title: 'Order ID', dataIndex: 'id', key: 'id' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Date', dataIndex: 'orderDate', key: 'orderDate' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          PENDING: { color: 'orange', text: 'PENDING' },
          CONFIRMED: { color: 'blue', text: 'CONFIRMED' },
          SHIPPING: { color: 'cyan', text: 'SHIPPING' },
          DELIVERED: { color: 'green', text: 'DELIVERED' },
          CANCELLED: { color: 'red', text: 'CANCELLED' }
        };
        const config = statusConfig[status] || { color: 'default', text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
  ];

  const productColumns = [
    { title: 'Product Name', dataIndex: 'name', key: 'name' },
    { title: 'Sold', dataIndex: 'sold', key: 'sold' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
  ];

  if (loading) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <AdminSidebar collapsed={collapsed} />
        <Layout>
          <AdminHeader
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
            colorBgContainer={colorBgContainer}
          />
          <Content style={{
            margin: '24px 16px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 280
          }}>
            <Spin size="large" tip="Loading dashboard..." />
          </Content>
        </Layout>
      </Layout>
    );
  }

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
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} name="Revenue ($)" />
                    <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#82ca9d" name="Orders" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card title="Category Sales Distribution" bordered={false} className="chart-card">
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
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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

          {/* Lists Section */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Recent Orders" bordered={false} className="list-card">
                <Table columns={orderColumns} dataSource={recentOrders} pagination={false} size="small" />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Top Selling Products" bordered={false} className="list-card">
                <Table columns={productColumns} dataSource={topProducts} pagination={false} size="small" />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;