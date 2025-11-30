import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Switch, Popconfirm, message, Row, Col, Card } from 'antd'; // Thêm Row, Col, Card
import { SearchOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
// Thêm Recharts imports
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import './AdminCoupon.css';

// Mock Data (Giữ nguyên)
const initialCoupons = [ /* ... */ ];

const AdminCouponList = () => {
    const [coupons, setCoupons] = useState(initialCoupons);
    const handleStatusChange = (checked, record) => {
        const newActive = checked ? 1 : 0;
        const updatedCoupons = coupons.map(coupon => {
            if (coupon.id_coupon === record.id_coupon) {
                return { ...coupon, active: newActive };
            }
            return coupon;
        });
        setCoupons(updatedCoupons);
        message.success(`Coupon ${record.code} is now ${checked ? 'Active' : 'Inactive'}`);
    };

    const handleDelete = (key) => {
        const newData = coupons.filter((item) => item.key !== key);
        setCoupons(newData);
        message.success('Coupon deleted successfully');
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id_coupon',
            key: 'id_coupon',
            width: 60,
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            render: (text) => <Tag color="green" style={{ fontSize: '14px', fontWeight: 'bold' }}>{text}</Tag>,
            filteredValue: [searchText],
            onFilter: (value, record) =>
                record.code.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Discount',
            dataIndex: 'discount_amount',
            key: 'discount_amount',
            render: (val) => <span>{val >= 1000 ? `${val.toLocaleString()}đ` : `${val}%/K`}</span>, // Simple heuristic for display
        },
        {
            title: 'Min Order',
            dataIndex: 'min_order_value',
            key: 'min_order_value',
            render: (val) => <span>{val.toLocaleString()}</span>,
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
            render: (text) => dayjs(text).format('YYYY-MM-DD'),
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            key: 'end_date',
            render: (text) => dayjs(text).format('YYYY-MM-DD'),
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            render: (active, record) => (
                <Switch
                    checked={active === 1}
                    onChange={(checked) => handleStatusChange(checked, record)}
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const statusCounts = { Active: 0, Inactive: 0 };
    coupons.forEach(coupon => {
        if (coupon.active === 1) statusCounts.Active += 1;
        else statusCounts.Inactive += 1;
    });
    const pieData = Object.keys(statusCounts).map(status => ({
        name: status,
        value: statusCounts[status]
    }));
    const COLORS = ['#00C49F', '#FF8042'];

    const discountCounts = {};
    coupons.forEach(coupon => {
        const amount = coupon.discount_amount;
        discountCounts[amount] = (discountCounts[amount] || 0) + 1;
    });
    const barData = Object.keys(discountCounts).map(amount => ({
        amount: `Discount ${amount}`,
        count: discountCounts[amount]
    }));

    return (
        <div className="admin-coupon-list">
            <div className="coupon-list-header">
                <Input />
                <Button type="primary" icon={<PlusOutlined />}>Add Coupon</Button>
            </div>

            <Table
                columns={columns}
                dataSource={coupons}
                pagination={{ pageSize: 10 }}
                rowKey="key"
                className="coupon-table"
            />

            <Row gutter={24} style={{ marginTop: 24 }}>
                <Col span={12}>
                    <Card title="Coupon Status Distribution" bordered={false}>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Discount Amount Distribution" bordered={false}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="amount" />
                                <YAxis allowDecimals={false} />
                                <RechartsTooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" name="Coupons" barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminCouponList;