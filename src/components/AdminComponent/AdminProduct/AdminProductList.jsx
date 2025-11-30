import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Popconfirm } from 'antd';
import { SearchOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import './AdminProduct.css';

const initialProducts = [
    { key: 1, id_product: '20', name_product: 'Blackmores ok ne', price: 50, stock_quantity: 200 },
    { key: 2, id_product: '1', name_product: 'Blackmores01', price: 32.5, stock_quantity: 200 },
    { key: 3, id_product: '2', name_product: 'Blackmores02', price: 32.5, stock_quantity: 200 },
];

const AdminProductList = () => {
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState(initialProducts);

    const handleDelete = (key) => {
        const newData = products.filter((item) => item.key !== key);
        setProducts(newData);
    };

    const columns = [
        { title: 'ID', dataIndex: 'id_product', key: 'id_product', width: 80, fixed: 'left' },
        { title: 'Name', dataIndex: 'name_product', key: 'name_product', width: 150, fixed: 'left' },
        { title: 'Price', dataIndex: 'price', key: 'price', width: 100, render: (price) => <span style={{ fontWeight: 'bold' }}>${price}</span>, },
        { title: 'Stock', dataIndex: 'stock_quantity', key: 'stock_quantity', width: 100, sorter: (a, b) => a.stock_quantity - b.stock_quantity },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (_, record) => (
                <Space size="small">
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="admin-product-list">
            <div className="product-list-header">
                <Input
                    placeholder="Search products..."
                    prefix={<SearchOutlined />}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
                <Button type="primary" icon={<PlusOutlined />}>Add Product</Button>
            </div>

            <Table
                columns={columns}
                dataSource={products}
                pagination={{ pageSize: 5 }}
                rowKey="key"
                className="product-table"
            />
        </div>
    );
};

export default AdminProductList;