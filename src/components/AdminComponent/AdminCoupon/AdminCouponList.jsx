import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Tag, Switch, Popconfirm, message, Row, Col, Card, Modal, Form, InputNumber, Select, DatePicker } from 'antd';
import { SearchOutlined, DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import './AdminCoupon.css';
import { getAllCoupons, createCoupon, updateCoupon, deleteCoupon, updateCouponStatus } from '../../../services/adminCouponService';

// Coupons will be fetched from backend

const AdminCouponList = () => {
    const [coupons, setCoupons] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [form] = Form.useForm();

    const fetchCoupons = async () => {
        setLoading(true);
        try {
            const response = await getAllCoupons();
            console.log('Coupon API Response:', response);

            // Handle different response structures
            let couponsData = [];
            if (response && response.success && response.data) {
                couponsData = response.data;
            } else if (Array.isArray(response)) {
                couponsData = response;
            } else if (response && Array.isArray(response.data)) {
                couponsData = response.data;
            }

            console.log('Coupons Data:', couponsData);

            if (couponsData.length > 0) {
                const transformed = couponsData.map(c => ({
                    key: c.idCoupon,
                    id_coupon: c.idCoupon,
                    status: c.status,
                    code: c.code,
                    discount_amount: c.discountAmount,
                    start_date: c.startDate,
                    end_date: c.endDate,
                    min_order_value: c.minOrderValue
                }));
                console.log('Transformed Coupons:', transformed);
                setCoupons(transformed);
            } else {
                console.log('No coupons found');
                message.info('No coupons available');
            }
        } catch (err) {
            console.error('Error fetching coupons:', err);
            message.error('Error fetching coupons: ' + (err.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleStatusChange = async (checked, record) => {
        const newStatus = checked ? 'ACTIVE' : 'INACTIVE';
        try {
            await updateCouponStatus(record.id_coupon, newStatus);
            message.success(`Coupon ${record.code} status updated to ${newStatus}`);
            fetchCoupons();
        } catch (err) {
            console.error(err);
            message.error('Failed to update coupon status');
        }
    };

    const handleDelete = async (key) => {
        try {
            await deleteCoupon(key);
            message.success('Coupon deleted successfully');
            fetchCoupons();
        } catch (err) {
            console.error(err);
            message.error('Failed to delete coupon');
        }
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
            render: (val) => <span>{val >= 1000 ? `${val.toLocaleString()}đ` : `${val}`}</span>, // Simple heuristic for display
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Switch
                    checked={status === 'ACTIVE'}
                    onChange={(checked) => handleStatusChange(checked, record)}
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="default" icon={<EditOutlined />} size="small" onClick={() => {
                        setEditingCoupon(record);
                        form.setFieldsValue({
                            code: record.code,
                            discount_amount: record.discount_amount,
                            min_order_value: record.min_order_value,
                            start_date: dayjs(record.start_date).format('YYYY-MM-DD'),
                            end_date: dayjs(record.end_date).format('YYYY-MM-DD'),
                            status: record.status
                        });
                        setIsEditModalVisible(true);
                    }} />
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id_coupon)}>
                        <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Prepare Data for Charts
    const statusCounts = { ACTIVE: 0, INACTIVE: 0 };
    coupons.forEach(coupon => {
        if (coupon.status === 'ACTIVE') statusCounts.ACTIVE += 1;
        else if (coupon.status === 'INACTIVE') statusCounts.INACTIVE += 1;
    });
    const pieData = Object.keys(statusCounts).map(status => ({
        name: status,
        value: statusCounts[status]
    }));
    const COLORS = ['#00C49F', '#FF8042'];

    // Group by Discount Amount
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
                <Input
                    placeholder="Search by Coupon Code..."
                    prefix={<SearchOutlined />}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                    setEditingCoupon(null);
                    form.resetFields();
                    setIsEditModalVisible(true);
                }}>Add Coupon</Button>
            </div>

            <Table
                columns={columns}
                dataSource={coupons}
                pagination={{ pageSize: 10 }}
                rowKey="key"
                loading={loading}
                className="coupon-table"
            // scroll={{ x: 1500 }}
            />
            {/* Add / Edit Modal */}
            <Modal
                title={editingCoupon ? 'Update Coupon' : 'Create Coupon'}
                visible={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                onOk={() => {
                    form.validateFields().then(async (values) => {
                        const payload = {
                            code: values.code,
                            discountAmount: values.discount_amount,
                            minOrderValue: values.min_order_value,
                            startDate: values.start_date,
                            endDate: values.end_date,
                        };
                        // For create, add status field
                        if (!editingCoupon) {
                            payload.status = values.status || 'ACTIVE';
                        }
                        try {
                            if (editingCoupon) {
                                await updateCoupon(editingCoupon.id_coupon, payload);
                                message.success('Coupon updated');
                            } else {
                                await createCoupon(payload);
                                message.success('Coupon created');
                            }
                            fetchCoupons();
                        } catch (err) {
                            console.error(err);
                            message.error('Operation failed');
                        }
                        setIsEditModalVisible(false);
                    });
                }}
                okText="Save"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="code" label="Code" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="discount_amount" label="Discount Amount" rules={[{ required: true }]}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="min_order_value" label="Min Order Value" rules={[{ required: true }]}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="start_date" label="Start Date" rules={[{ required: true, message: 'Please select start date' }]}>
                        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item name="end_date" label="End Date" rules={[{ required: true, message: 'Please select end date' }]}>
                        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                    </Form.Item>
                    {!editingCoupon && (
                        <Form.Item name="status" label="Status" rules={[{ required: true }]} initialValue="ACTIVE">
                            <Select style={{ width: '100%' }}>
                                <Select.Option value="ACTIVE">ACTIVE</Select.Option>
                                <Select.Option value="INACTIVE">INACTIVE</Select.Option>
                            </Select>
                        </Form.Item>
                    )}
                </Form>
            </Modal>

            {/* Charts Section */}
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
