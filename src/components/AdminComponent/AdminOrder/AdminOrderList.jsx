import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Tag, Modal, Select, message, DatePicker, Row, Col, Card } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import AdminOrderDetail from './AdminOrderDetail';
import './AdminOrder.css';
import dayjs from 'dayjs';
import { getAllOrders, updateOrderStatus } from '../../../services/adminOrderService';

const { Option } = Select;
const { RangePicker } = DatePicker;

// Orders will be fetched from backend via adminOrderService

// Order details will be fetched per order via API when needed

const AdminOrderList = () => {
    const [orders, setOrders] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [isEditStatusModalVisible, setIsEditStatusModalVisible] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch orders from backend
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await getAllOrders();
            if (response && response.success) {
                const transformed = response.data.map(o => ({
                    key: o.idOrder,
                    id_order: o.idOrder,
                    id_user: o.idUser,
                    order_date: o.orderDate,
                    total_amount: o.totalAmount,
                    coupon_discount: o.couponDiscount,
                    final_amount: o.finalAmount,
                    payment_method: o.paymentMethod,
                    status: o.status,
                    delivery_address: o.deliveryAddress,
                    orderDetails: (o.orderDetails || []).map(d => ({
                        id_order_detail: d.idOrderDetail,
                        id_product: d.idProduct,
                        image_product: d.imageProduct,
                        name_product: d.productName,
                        quantity: d.quantity,
                        unit_price: d.unitPrice,
                        total_price: d.totalPrice
                    }))
                }));
                setOrders(transformed);
            } else {
                message.error('Failed to fetch orders');
            }
        } catch (err) {
            console.error('Fetch orders error:', err);
            message.error('Error fetching orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);


    const handleViewDetails = (record) => {
        const details = record.orderDetails || [];
        setSelectedOrderDetails(details);
        setSelectedOrderId(record.id_order);
        setIsModalVisible(true);
    };
    const handleEditStatus = (record) => {
        setCurrentOrder(record);
        setNewStatus(record.status);
        setIsEditStatusModalVisible(true);
    };

    const handleSaveStatus = async () => {
        try {
            const response = await updateOrderStatus(currentOrder.id_order, newStatus);
            if (response && response.success) {
                message.success(`Order #${currentOrder.id_order} status updated to ${newStatus}`);
                fetchOrders();
            } else {
                message.error('Failed to update order status');
            }
        } catch (err) {
            console.error('Update status error:', err);
            message.error('Error updating order status');
        }
        setIsEditStatusModalVisible(false);
    };

    const columns = [
        {
            title: 'ID Order',
            dataIndex: 'id_order',
            key: 'id_order',
            width: 80,
            fixed: 'left',
        },
        {
            title: 'User ID',
            dataIndex: 'id_user',
            key: 'id_user',
            width: 80,
        },
        {
            title: 'Order Date',
            dataIndex: 'order_date',
            key: 'order_date',
            width: 180,
            render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: 'Total Amount',
            dataIndex: 'total_amount',
            key: 'total_amount',
            width: 120,
            render: (price) => <span>${price}</span>,
        },
        {
            title: 'Discount',
            dataIndex: 'coupon_discount',
            key: 'coupon_discount',
            width: 120,
        },
        {
            title: 'Final Amount',
            dataIndex: 'final_amount',
            key: 'final_amount',
            width: 120,
            render: (price) => <span style={{ fontWeight: 'bold', color: '#1890ff' }}>${price}</span>,
        },
        {
            title: 'Payment',
            dataIndex: 'payment_method',
            key: 'payment_method',
            width: 100,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => {
                let color = 'geekblue';
                if (status === 'PENDING') color = 'purple';
                if (status === 'CONFIRMED') color = 'green';
                if (status === 'SHIPPING') color = 'orange';
                if (status === 'DELIVERED') color = 'blue';
                if (status === 'CANCELLED') color = 'red';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Address',
            dataIndex: 'delivery_address',
            key: 'delivery_address',
            width: 250,
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="default"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => handleViewDetails(record)}
                    >
                        Details
                    </Button>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEditStatus(record)}
                    >
                        Status
                    </Button>
                </Space>
            ),
        },
    ];

    // Prepare Data for Charts
    const statusCounts = {};
    orders.forEach(order => {
        statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
    });
    const pieData = Object.keys(statusCounts).map(status => ({
        name: status,
        value: statusCounts[status]
    }));
    const COLORS = ['#800080', '#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // PENDING, CONFIRMED, SHIPPING, DELIVERED, CANCELLED

    // Group by Date for Line Chart
    const revenueByDate = {};
    orders.forEach(order => {
        const date = dayjs(order.order_date).format('YYYY-MM-DD');
        revenueByDate[date] = (revenueByDate[date] || 0) + order.final_amount;
    });
    const lineData = Object.keys(revenueByDate).map(date => ({
        date,
        revenue: revenueByDate[date]
    })).sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());

    return (
        <div className="admin-order-list">
            <div className="order-list-header">
                <Input
                    placeholder="Search by Order ID..."
                    prefix={<SearchOutlined />}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
                <RangePicker showTime />
            </div>

            <Table
                columns={columns}
                dataSource={orders.filter(order =>
                    order.id_order.toString().includes(searchText) ||
                    order.status.toLowerCase().includes(searchText.toLowerCase())
                )}
                pagination={{ pageSize: 10 }}
                rowKey="key"
                loading={loading}
                className="order-table"
                scroll={{ x: 1500 }}
            />

            {/* Charts Section */}
            <Row gutter={24} style={{ marginTop: 24 }}>
                <Col span={12}>
                    <Card title="Order Status Distribution" bordered={false}>
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
                    <Card title="Revenue Trend (Daily)" bordered={false}>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={lineData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <RechartsTooltip />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue ($)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>

            {/* View Details Modal */}
            <Modal
                title={`Order Details #${selectedOrderId}`}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={800}
            >
                <AdminOrderDetail data={selectedOrderDetails} />
            </Modal>

            {/* Edit Status Modal */}
            <Modal
                title={`Update Status for Order #${currentOrder?.id_order}`}
                open={isEditStatusModalVisible}
                onOk={handleSaveStatus}
                onCancel={() => setIsEditStatusModalVisible(false)}
            >
                <p>Current Status: <strong>{currentOrder?.status}</strong></p>
                <Select
                    style={{ width: '100%' }}
                    value={newStatus}
                    onChange={setNewStatus}
                >
                    <Option value="PENDING">PENDING</Option>
                    <Option value="CONFIRMED">CONFIRMED</Option>
                    <Option value="SHIPPING">SHIPPING</Option>
                    <Option value="DELIVERED">DELIVERED</Option>
                    <Option value="CANCELLED">CANCELLED</Option>
                </Select>
            </Modal>
        </div>
    );
};

export default AdminOrderList;
