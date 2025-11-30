import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Modal } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';

import AdminOrderDetail from './AdminOrderDetail';
import './AdminOrder.css';
import dayjs from 'dayjs';

const initialOrders = [
    { key: 2, id_order: 2, delivery_address: '88 Nguyễn Văn Cừ...', order_date: '2025-11-11 12:58:29', status: 'CONFIRMED', final_amount: 242.5 },
    { key: 3, id_order: 3, delivery_address: '88 Nguyễn Văn Cừ...', order_date: '2025-11-11 13:03:41', status: 'SHIPPING', final_amount: 210 },
    { key: 4, id_order: 4, delivery_address: '88 Nguyễn Văn Cừ...', order_date: '2025-11-11 13:07:05', status: 'SHIPPING', final_amount: 210 },
    { key: 13, id_order: 13, delivery_address: '12 Nguyen Van Bao...', order_date: '2025-11-27 07:18:58', status: 'SHIPPING', final_amount: 922.5 },
    { key: 14, id_order: 14, delivery_address: '12 Nguyen Van Bao...', order_date: '2025-11-27 07:37:51', status: 'CONFIRMED', final_amount: 965 },
    { key: 15, id_order: 15, delivery_address: '12 Nguyen Van Bao...', order_date: '2025-11-27 15:10:07', status: 'CONFIRMED', final_amount: 250 },
];

const mockOrderDetails = [
    { id_order_detail: 1, quantity: 2, total_price: 65, unit_price: 32.5, id_order: 2, id_product: 1, name_product: 'Blackmores01', image_product: 'https://placehold.co/50x50?text=P1' },
    { id_order_detail: 2, quantity: 3, total_price: 97.5, unit_price: 32.5, id_order: 2, id_product: 2, name_product: 'Blackmores02', image_product: 'https://placehold.co/50x50?text=P2' },
    { id_order_detail: 4, quantity: 4, total_price: 130, unit_price: 32.5, id_order: 3, id_product: 2, name_product: 'Blackmores02', image_product: 'https://placehold.co/50x50?text=P2' },
    { id_order_detail: 23, quantity: 5, total_price: 162.5, unit_price: 32.5, id_order: 13, id_product: 3, name_product: 'Product 3', image_product: 'https://placehold.co/50x50?text=P3' },
];

const AdminOrderList = () => {
    const [orders] = useState(initialOrders);
    const [searchText, setSearchText] = useState(''); // Giữ lại state để giữ form.
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
            </div>
            <Table
                columns={columns}
                dataSource={orders}
                pagination={{ pageSize: 10 }}
                rowKey="key"
                className="order-table"
                scroll={{ x: 1000 }}
            />

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
        </div>
    );
};

export default AdminOrderList;