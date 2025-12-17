import React, { useEffect, useState } from 'react';
import { Modal, Descriptions, Table, Tag, message, Divider } from 'antd';
import { getOrderById } from '../../../../services/orderService';

const OrderDetailsModal = ({ open, onCancel, orderId }) => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && orderId) {
            fetchOrderDetails(orderId);
        } else {
            setOrder(null);
        }
    }, [open, orderId]);

    const fetchOrderDetails = async (id) => {
        setLoading(true);
        try {
            const response = await getOrderById(id);
            if (response && response.success) {
                setOrder(response.data);
            } else {
                message.error("Failed to load order details");
            }
        } catch (error) {
            console.error("Error fetching order details:", error);
            message.error("Error fetching order details");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Product',
            dataIndex: 'productName',
            key: 'productName',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                        src={record.imageProduct || "https://placehold.co/40x40"}
                        alt={text}
                        style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
                    />
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            render: (price) => `$${price}`,
        },
        {
            title: 'Qty',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Total',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (price) => `$${price}`,
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'orange';
            case 'CONFIRMED': return 'blue';
            case 'SHIPPING': return 'purple';
            case 'DELIVERED': return 'green';
            case 'CANCELLED': return 'red';
            default: return 'default';
        }
    };

    return (
        <Modal
            title={`Order Details #${orderId}`}
            open={open}
            onCancel={onCancel}
            footer={null}
            width={800}
            loading={loading}
        >
            {order && (
                <div style={{ padding: '10px 0' }}>
                    <Descriptions bordered column={1} size="small">
                        <Descriptions.Item label="Order Date">
                            {new Date(order.orderDate).toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status">
                            <Tag color={getStatusColor(order.status)}>{order.status}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Payment Method">
                            {order.paymentMethod}
                        </Descriptions.Item>
                        <Descriptions.Item label="Delivery Address">
                            {order.deliveryAddress}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone Number">
                            {order.phoneNumber || "N/A"}
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider orientation="left">Items</Divider>

                    <Table
                        dataSource={order.orderDetails}
                        columns={columns}
                        rowKey="idOrderDetail"
                        pagination={false}
                        size="small"
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <div style={{ width: '300px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span>Subtotal:</span>
                                <span>${order.totalAmount}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span>Discount:</span>
                                <span style={{ color: 'green' }}>-${order.couponDiscount}</span>
                            </div>
                            <Divider style={{ margin: '10px 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px' }}>
                                <span>Total:</span>
                                <span style={{ color: '#2859C5' }}>${order.finalAmount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default OrderDetailsModal;
