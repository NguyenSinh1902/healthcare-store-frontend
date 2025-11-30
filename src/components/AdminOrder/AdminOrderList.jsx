import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Modal, DatePicker } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';

import AdminOrderDetail from './AdminOrderDetail';
import './AdminOrder.css';
import dayjs from 'dayjs';

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

const mockOrderDetails = [
    { id_order_detail: 1, quantity: 2, total_price: 65, unit_price: 32.5, id_order: 2, id_product: 1, name_product: 'Blackmores01', image_product: 'https://placehold.co/50x50?text=P1' },
    { id_order_detail: 2, quantity: 3, total_price: 97.5, unit_price: 32.5, id_order: 2, id_product: 2, name_product: 'Blackmores02', image_product: 'https://placehold.co/50x50?text=P2' },
    { id_order_detail: 4, quantity: 4, total_price: 130, unit_price: 32.5, id_order: 3, id_product: 2, name_product: 'Blackmores02', image_product: 'https://placehold.co/50x50?text=P2' },
    { id_order_detail: 23, quantity: 5, total_price: 162.5, unit_price: 32.5, id_order: 13, id_product: 3, name_product: 'Product 3', image_product: 'https://placehold.co/50x50?text=P3' },
    { id_order_detail: 24, quantity: 5, total_price: 162.5, unit_price: 32.5, id_order: 14, id_product: 1, name_product: 'Blackmores01', image_product: 'https://placehold.co/50x50?text=P1' },
    { id_order_detail: 25, quantity: 6, total_price: 195, unit_price: 32.5, id_order: 14, id_product: 5, name_product: 'Product 5', image_product: 'https://placehold.co/50x50?text=P5' },
];


const AdminOrderList = () => {

    const [orders] = useState(initialOrders); 
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);


    const handleViewDetails = (record) => {
        const details = mockOrderDetails.filter(detail => detail.id_order === record.id_order);
        setSelectedOrderDetails(details);
        setSelectedOrderId(record.id_order);
        setIsModalVisible(true);
    };

    const columns = [
        { title: 'ID Order', dataIndex: 'id_order', key: 'id_order', width: 80, fixed: 'left' },
        { title: 'Order Date', dataIndex: 'order_date', key: 'order_date', width: 180, render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss') },
        { title: 'Final Amount', dataIndex: 'final_amount', key: 'final_amount', width: 120, render: (price) => <span style={{ fontWeight: 'bold' }}>${price}</span> },
        { title: 'Status', dataIndex: 'status', key: 'status', width: 120, render: (status) => <Tag color={status === 'CONFIRMED' ? 'green' : 'orange'}>{status}</Tag> },
        { title: 'Address', dataIndex: 'delivery_address', key: 'delivery_address', width: 250, ellipsis: true },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 100,
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
                scroll={{ x: 1000 }}
            />

            <Modal
                title={`Order Details #${selectedOrderId}`}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={800}
            >
                <AdminOrderDetail data={selectedOrderDetails} />
            </Modal>
        </div>
    );
};

export default AdminOrderList;