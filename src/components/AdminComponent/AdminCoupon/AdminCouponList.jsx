import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Switch, Popconfirm, message } from 'antd';
import { SearchOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import './AdminCoupon.css';

const initialCoupons = [
    { key: 1, id_coupon: 1, active: 1, code: 'GIAM50K', discount_amount: 50, end_date: '2025-12-31', min_order_value: 30, start_date: '2025-01-01' },
    { key: 2, id_coupon: 2, active: 1, code: 'SALE20K', discount_amount: 20, end_date: '2025-12-31', min_order_value: 20, start_date: '2025-01-01' },
    { key: 3, id_coupon: 3, active: 1, code: 'VIP100K', discount_amount: 10, end_date: '2025-12-31', min_order_value: 50, start_date: '2025-01-01' },
    { key: 4, id_coupon: 4, active: 1, code: 'NEW10K', discount_amount: 10, end_date: '2025-12-31', min_order_value: 10, start_date: '2025-01-01' },
    { key: 7, id_coupon: 7, active: 1, code: 'GIAM50Kabc', discount_amount: 50, end_date: '2025-12-31', min_order_value: 300000, start_date: '2025-01-01' },
];

const AdminCouponList = () => {
    const [coupons, setCoupons] = useState(initialCoupons);
    const [searchText, setSearchText] = useState('');

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
        { title: 'ID', dataIndex: 'id_coupon', key: 'id_coupon', width: 60, },
        { title: 'Code', dataIndex: 'code', key: 'code', render: (text) => <Tag color="green">{text}</Tag> },
        { title: 'Discount', dataIndex: 'discount_amount', key: 'discount_amount', render: (val) => <span>{val >= 1000 ? `${val.toLocaleString()}đ` : `${val}%/K`}</span> },
        { title: 'Min Order', dataIndex: 'min_order_value', key: 'min_order_value', render: (val) => <span>{val.toLocaleString()}</span> },
        { title: 'Start Date', dataIndex: 'start_date', key: 'start_date', render: (text) => dayjs(text).format('YYYY-MM-DD') },
        { title: 'End Date', dataIndex: 'end_date', key: 'end_date', render: (text) => dayjs(text).format('YYYY-MM-DD') },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            render: (active, record) => (
                <Switch checked={active === 1} onChange={(checked) => handleStatusChange(checked, record)} />
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


    return (
        <div className="admin-coupon-list">
            <div className="coupon-list-header">
                <Input
                    placeholder="Search by Coupon Code..."
                    prefix={<SearchOutlined />}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
                <Button type="primary" icon={<PlusOutlined />}>Add Coupon</Button>
            </div>

            <Table
                columns={columns}
                dataSource={coupons}
                pagination={{ pageSize: 10 }}
                rowKey="key"
                className="coupon-table"
            />

        </div>
    );
};

export default AdminCouponList;