import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Modal, Select, message, DatePicker } from 'antd'; // Thêm Select, message
import { SearchOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';

import AdminOrderDetail from './AdminOrderDetail';
import './AdminOrder.css';
import dayjs from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;

const initialOrders = [
    { key: 2, id_order: 2, coupon_discount: '50,000', delivery_address: '88 Nguyễn Văn Cừ, Quận 5, TP.HCM', final_amount: 0, order_date: '2025-11-11 12:58:29', payment_method: 'CASH', status: 'CONFIRMED', total_amount: 292.5, id_coupon: 1, id_user: 1 },
    { key: 3, id_order: 3, coupon_discount: '50,000', delivery_address: '88 Nguyễn Văn Cừ, Quận 5, TP.HCM', final_amount: 0, order_date: '2025-11-11 13:03:41', payment_method: 'CASH', status: 'SHIPPING', total_amount: 260, id_coupon: 1, id_user: 2 },
    { key: 4, id_order: 4, coupon_discount: '50', delivery_address: '88 Nguyễn Văn Cừ, Quận 5, TP.HCM', final_amount: 210, order_date: '2025-11-11 13:07:05', payment_method: 'CASH', status: 'SHIPPING', total_amount: 260, id_coupon: 1, id_user: 3 },
    { key: 5, id_order: 5, coupon_discount: '50', delivery_address: '88 Nguyễn Văn Cừ, Quận 5, TP.HCM', final_amount: 210, order_date: '2025-11-11 13:23:03', payment_method: 'CASH', status: 'CONFIRMED', total_amount: 260, id_coupon: 1, id_user: 1 },
    { key: 13, id_order: 13, coupon_discount: '20', delivery_address: '12 Nguyen Van Bao, Go Vap, HCM', final_amount: 922.5, order_date: '2025-11-27 07:18:58', payment_method: 'CASH', status: 'SHIPPING', total_amount: 942.5, id_coupon: 2, id_user: 5 },
    { key: 14, id_order: 14, coupon_discount: '10', delivery_address: '12 Nguyen Van Bao, Go Vap, HCM', final_amount: 965, order_date: '2025-11-27 07:37:51', payment_method: 'CASH', status: 'CONFIRMED', total_amount: 975, id_coupon: 4, id_user: 5 },
    { key: 15, id_order: 15, coupon_discount: '10', delivery_address: '12 Nguyen Van Bao, Go Vap, HCM', final_amount: 250, order_date: '2025-11-27 15:10:07', payment_method: 'CASH', status: 'CONFIRMED', total_amount: 260, id_coupon: 4, id_user: 2 },
];

const mockOrderDetails = [];


const AdminOrderList = () => {
    const [orders, setOrders] = useState(initialOrders);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const [isEditStatusModalVisible, setIsEditStatusModalVisible] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    const handleViewDetails = (record) => {};

    const handleEditStatus = (record) => {
        setCurrentOrder(record);
        setNewStatus(record.status);
        setIsEditStatusModalVisible(true);
    };

    const handleSaveStatus = () => {
        const updatedOrders = orders.map(order => {
            if (order.id_order === currentOrder.id_order) {
                return { ...order, status: newStatus };
            }
            return order;
        });
        setOrders(updatedOrders);
        setIsEditStatusModalVisible(false);
        message.success(`Order #${currentOrder.id_order} status updated to ${newStatus}`);
    };

    const columns = [
        { title: 'ID Order', dataIndex: 'id_order', key: 'id_order', width: 80, fixed: 'left' },
        { title: 'User ID', dataIndex: 'id_user', key: 'id_user', width: 80 },
        { title: 'Order Date', dataIndex: 'order_date', key: 'order_date', width: 180, render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss') },
        { title: 'Total Amount', dataIndex: 'total_amount', key: 'total_amount', width: 120, render: (price) => <span>${price}</span> },
        { title: 'Discount', dataIndex: 'coupon_discount', key: 'coupon_discount', width: 120 },
        { title: 'Final Amount', dataIndex: 'final_amount', key: 'final_amount', width: 120, render: (price) => <span style={{ fontWeight: 'bold', color: '#1890ff' }}>${price}</span> },
        { title: 'Payment', dataIndex: 'payment_method', key: 'payment_method', width: 100 },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => {
                let color = 'geekblue';
                if (status === 'CONFIRMED') color = 'green';
                if (status === 'SHIPPING') color = 'orange';
                if (status === 'CANCELLED') color = 'red';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        { title: 'Address', dataIndex: 'delivery_address', key: 'delivery_address', width: 250, ellipsis: true },
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
                        onClick={() => handleEditStatus(record)} // Thêm nút Edit Status
                    >
                        Status
                    </Button>
                </Space>
            ),
        },
    ];

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
                className="order-table"
                scroll={{ x: 1500 }}
            />

            <Modal>
                <AdminOrderDetail data={selectedOrderDetails} />
            </Modal>

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
