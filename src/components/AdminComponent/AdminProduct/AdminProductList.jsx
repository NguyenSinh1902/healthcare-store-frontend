import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Popconfirm, Card, Row, Col, Tooltip, Image } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import './AdminProduct.css';

const initialProducts = [
    {
        key: 1,
        id_product: '20',
        brand: 'Black',
        description: 'Provides comprehensive support for both cardiovascular health and general well-being.',
        discount_percent: 28,
        image_product: 'https://placehold.co/50x50?text=Main',
        information: 'Shelf Life: 3 years from manufacturing date. Store in a cool, dry place.',
        name_product: 'Blackmores ok ne',
        old_price: 45,
        price: 50,
        product_group: 'RECOMMENDED',
        stock_quantity: 200,
        id_category: 6,
        thumbnails: [
            'https://placehold.co/50x50?text=Thumb1',
            'https://placehold.co/50x50?text=Thumb2'
        ]
    },
    {
        key: 2,
        id_product: '1',
        brand: 'Blackmores',
        description: 'Supports heart and brain health.',
        discount_percent: 28,
        image_product: 'https://placehold.co/50x50?text=Main',
        information: 'Take 2 capsules daily after meals.',
        name_product: 'Blackmores01',
        old_price: 45,
        price: 32.5,
        product_group: 'RECOMMENDED',
        stock_quantity: 200,
        id_category: 4,
        thumbnails: []
    },
    {
        key: 3,
        id_product: '2',
        brand: 'Blackmores',
        description: 'Supports heart and brain health.',
        discount_percent: 28,
        image_product: 'https://placehold.co/50x50?text=Main',
        information: 'Take 2 capsules daily after meals.',
        name_product: 'Blackmores02',
        old_price: 45,
        price: 32.5,
        product_group: 'RECOMMENDED',
        stock_quantity: 200,
        id_category: 5,
        thumbnails: []
    },

    ...Array.from({ length: 15 }).map((_, i) => ({
        key: i + 4,
        id_product: `${i + 4}`,
        brand: i % 2 === 0 ? 'PharmaCare' : 'HealthPlus',
        description: `Description for product ${i + 4}. This is a long description to test the ellipsis functionality in the table column.`,
        discount_percent: 10,
        image_product: 'https://placehold.co/50x50?text=Main',
        information: `Information for product ${i + 4}`,
        name_product: `Product ${i + 4}`,
        old_price: 100,
        price: 90,
        product_group: 'Medicine',
        stock_quantity: Math.floor(Math.random() * 100),
        id_category: i % 5 + 1,
        thumbnails: ['https://placehold.co/50x50?text=T1']
    }))
];

const AdminProductList = () => {
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState(initialProducts);

    const handleDelete = (key) => {
        const newData = products.filter((item) => item.key !== key);
        setProducts(newData);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id_product',
            key: 'id_product',
            width: 80,
            fixed: 'left',
        },
        {
            title: 'Name',
            dataIndex: 'name_product',
            key: 'name_product',
            width: 150,
            fixed: 'left',
            filteredValue: [searchText],
            onFilter: (value, record) =>
                record.name_product.toLowerCase().includes(value.toLowerCase()) ||
                record.id_product.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Image',
            dataIndex: 'image_product',
            key: 'image_product',
            width: 100,
            render: (text) => (
                <Image src={text} alt="main" width={50} height={50} style={{ objectFit: 'cover' }} />
            ),
        },
        {
            title: 'Thumbnails',
            dataIndex: 'thumbnails',
            key: 'thumbnails',
            width: 200,
            render: (thumbnails) => (
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {thumbnails && thumbnails.length > 0 ? (
                        thumbnails.map((thumb, index) => (
                            <Image key={index} src={thumb} alt={`thumb-${index}`} width={30} height={30} style={{ objectFit: 'cover' }} />
                        ))
                    ) : (
                        <span style={{ color: '#ccc' }}>No thumbnails</span>
                    )}
                </div>
            ),
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
            width: 100,
        },
        {
            title: 'Category ID',
            dataIndex: 'id_category',
            key: 'id_category',
            width: 100,
        },
        {
            title: 'Group',
            dataIndex: 'product_group',
            key: 'product_group',
            width: 120,
            render: (text) => <Tag color="blue">{text}</Tag>
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 100,
            render: (price) => <span style={{ fontWeight: 'bold' }}>${price}</span>,
        },
        {
            title: 'Old Price',
            dataIndex: 'old_price',
            key: 'old_price',
            width: 100,
            render: (price) => price ? <span style={{ textDecoration: 'line-through', color: '#999' }}>${price}</span> : '-',
        },
        {
            title: 'Discount',
            dataIndex: 'discount_percent',
            key: 'discount_percent',
            width: 100,
            render: (percent) => percent > 0 ? <Tag color="red">-{percent}%</Tag> : '-',
        },
        {
            title: 'Stock',
            dataIndex: 'stock_quantity',
            key: 'stock_quantity',
            width: 100,
            sorter: (a, b) => a.stock_quantity - b.stock_quantity,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 200,
            ellipsis: {
                showTitle: false,
            },
            render: (description) => (
                <Tooltip placement="topLeft" title={description}>
                    {description}
                </Tooltip>
            ),
        },
        {
            title: 'Information',
            dataIndex: 'information',
            key: 'information',
            width: 200,
            ellipsis: {
                showTitle: false,
            },
            render: (info) => (
                <Tooltip placement="topLeft" title={info}>
                    {info}
                </Tooltip>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (_, record) => (
                <Space size="small">
                    <Button type="primary" icon={<EditOutlined />} size="small" />
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const stockChartData = [...products]
        .sort((a, b) => b.stock_quantity - a.stock_quantity)
        .slice(0, 10)
        .map(p => ({
            name: p.name_product,
            stock: p.stock_quantity
        }));

    const discountChartData = [...products]
        .sort((a, b) => b.discount_percent - a.discount_percent)
        .slice(0, 10)
        .map(p => ({
            name: p.name_product,
            discount: p.discount_percent
        }));

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
                scroll={{ x: 1800 }}
            />

            <Row gutter={24} style={{ marginTop: 24 }}>
                <Col span={12}>
                    <Card title="Stock Quantity Statistics (Top 10)" bordered={false}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stockChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <RechartsTooltip />
                                <Legend />
                                <Bar dataKey="stock" fill="#8884d8" name="Stock Quantity" barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Highest Discount Products (Top 10)" bordered={false}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={discountChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <RechartsTooltip />
                                <Legend />
                                <Bar dataKey="discount" fill="#82ca9d" name="Discount (%)" barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminProductList;
