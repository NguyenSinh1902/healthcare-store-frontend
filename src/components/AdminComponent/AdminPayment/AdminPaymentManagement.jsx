import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Card, Row, Col, Tag, Statistic, DatePicker, Select, message } from 'antd';
import { SearchOutlined, ReloadOutlined, DollarCircleOutlined, FileTextOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, BarChart, Bar,
    PieChart, Pie, Cell
} from 'recharts';
import dayjs from 'dayjs';
import { getAdminTransactions, getAdminPaymentDashboard, getAdminPaymentChart } from '../../../services/paymentService';
import './AdminPaymentManagement.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

const AdminPaymentManagement = () => {

    const [transactions, setTransactions] = useState([]);
    const [dashboardData, setDashboardData] = useState({
        totalRevenue: 0,
        totalTransactions: 0,
        successTransactions: 0,
        failedTransactions: 0
    });
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [keyword, setKeyword] = useState('');
    const [status, setStatus] = useState('');
    const [dateRange, setDateRange] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const dashRes = await getAdminPaymentDashboard();
            if (dashRes && dashRes.success !== false) {
                setDashboardData(dashRes);
            }

            const chartRes = await getAdminPaymentChart();
            if (Array.isArray(chartRes)) {
                setChartData(chartRes);
            }

            await fetchTransactionsList();

        } catch (error) {
            console.error("Fetch admin payment data error:", error);
            message.error("Failed to load payment data");
        } finally {
            setLoading(false);
        }
    };

    const fetchTransactionsList = async () => {
        setLoading(true);
        try {
            const params = {};
            if (keyword) params.keyword = keyword;
            if (status) params.status = status;
            if (dateRange && dateRange[0] && dateRange[1]) {
                params.startDate = dateRange[0].format('YYYY-MM-DD');
                params.endDate = dateRange[1].format('YYYY-MM-DD');
            }

            const res = await getAdminTransactions(params);
            if (res && res.success) {
                const sortedTransactions = res.data.sort((a, b) => b.idPayment - a.idPayment);
                setTransactions(sortedTransactions);
            }
        } catch (error) {
            console.error("Fetch transactions error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

    }, []);

    // Handlers
    const handleSearch = () => {
        fetchTransactionsList();
    };

    const handleReset = () => {
        setKeyword('');
        setStatus('');
        setDateRange([]);

        setTimeout(() => {

            getAdminTransactions({}).then(res => {
                if (res && res.success) setTransactions(res.data);
            });
        }, 0);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'idPayment',
            key: 'idPayment',
            width: 70,
        },
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
            width: 90,
            render: (text) => <b>#{text}</b>
        },
        {
            title: 'Transaction Ref',
            dataIndex: 'transactionRef',
            key: 'transactionRef',
            width: 150,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: 120,
            render: (amount) => (
                <span style={{ color: '#2859C5', fontWeight: 600 }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (st) => {
                let color = 'default';
                if (st === 'SUCCESS') color = 'success';
                if (st === 'FAILED') color = 'error';
                if (st === 'PENDING') color = 'warning';
                return <Tag color={color}>{st}</Tag>;
            }
        },
        {
            title: 'Payment Date',
            dataIndex: 'paymentDate',
            key: 'paymentDate',
            width: 180,
            render: (date) => date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '-'
        },
    ];

    return (
        <div className="admin-payment-container">
            <h2 className="page-title">Payment Management</h2>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col span={6}>
                    <Card className="dashboard-card card-revenue" bordered={false}>
                        <Statistic
                            title="Total Revenue"
                            style={{ fontWeight: 'bold' }}
                            value={dashboardData.totalRevenue}
                            precision={0}
                            valueStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '24px' }}
                            prefix="₫"
                        />
                        <div className="card-icon-bg"><DollarCircleOutlined /></div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="dashboard-card card-total" bordered={false}>
                        <Statistic
                            title="Total Trans"
                            style={{ fontWeight: 'bold' }}
                            value={dashboardData.totalTransactions}
                            valueStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '24px' }}
                        />
                        <div className="card-icon-bg"><FileTextOutlined /></div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="dashboard-card card-success" bordered={false}>
                        <Statistic
                            title="Success"
                            style={{ fontWeight: 'bold' }}
                            value={dashboardData.successTransactions}
                            valueStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '24px' }}
                        />
                        <div className="card-icon-bg"><CheckCircleOutlined /></div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="dashboard-card card-failed" bordered={false}>
                        <Statistic
                            title="Failed"
                            style={{ fontWeight: 'bold' }}
                            value={dashboardData.failedTransactions}
                            valueStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '24px' }}
                        />
                        <div className="card-icon-bg"><CloseCircleOutlined /></div>
                    </Card>
                </Col>
            </Row>

            <Card title="Transaction List" className="transaction-card" bordered={false} style={{ marginBottom: 24 }}>
                <div className="payment-filter-bar" style={{ marginBottom: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <Input
                        placeholder="Search by Order ID, Ref..."
                        style={{ width: 240 }}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        prefix={<SearchOutlined />}
                        allowClear
                    />
                    <Select
                        placeholder="Status"
                        style={{ width: 150 }}
                        value={status}
                        onChange={setStatus}
                        allowClear
                    >
                        <Option value="SUCCESS">SUCCESS</Option>
                        <Option value="FAILED">FAILED</Option>
                        <Option value="PENDING">PENDING</Option>
                    </Select>
                    <RangePicker
                        value={dateRange}
                        onChange={setDateRange}
                        format="YYYY-MM-DD"
                    />
                    <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>Filter</Button>
                    <Button icon={<ReloadOutlined />} onClick={handleReset}>Reset</Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={transactions}
                    rowKey="idPayment"
                    loading={loading}
                    pagination={{ pageSize: 10, showSizeChanger: true }}
                />
            </Card>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col span={16}>
                    <Card title="Revenue Trend" bordered={false} className="chart-card">
                        <div style={{ width: '100%', height: 400 }}>
                            <ResponsiveContainer>
                                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="date" stroke="#888" />
                                    <YAxis stroke="#888" tickFormatter={(value) => new Intl.NumberFormat('en', { notation: "compact" }).format(value)} />
                                    <RechartsTooltip
                                        formatter={(value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#8884d8"
                                        strokeWidth={3}
                                        activeDot={{ r: 8, strokeWidth: 0 }}
                                        name="Revenue"
                                        dot={{ r: 4, strokeWidth: 0, fill: '#8884d8' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>

                <Col span={8}>
                    <Card title="Payment Status" bordered={false} className="chart-card">
                        <div style={{ width: '100%', height: 400 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'Success', value: dashboardData.successTransactions },
                                            { name: 'Failed', value: dashboardData.failedTransactions }
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={120}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        <Cell fill="#00C49F" />
                                        <Cell fill="#FF8042" />
                                    </Pie>
                                    <RechartsTooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminPaymentManagement;
