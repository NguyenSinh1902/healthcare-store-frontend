import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Popconfirm, Card, Row, Col, Image } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import './AdminCategory.css';

const initialCategories = [
    { key: 1, id_category: 1, name_category: 'Thực phẩm chức năng', description: 'Con của danh mục Thực phẩm chức năng', image_category: 'https://placehold.co/50x50?text=TPCN', parent_category_id: null },
    { key: 2, id_category: 2, name_category: 'Dược mỹ phẩm', description: 'Con của danh mục Thực phẩm chức năng', image_category: 'https://placehold.co/50x50?text=DMP', parent_category_id: null },
    { key: 3, id_category: 3, name_category: 'Chăm sóc cá nhân', description: 'Con của danh mục Thực phẩm chức năng', image_category: 'https://placehold.co/50x50?text=CSCN', parent_category_id: null },
    { key: 4, id_category: 4, name_category: 'Vitamin', description: 'Con của danh mục Thực phẩm chức năng', image_category: 'https://placehold.co/50x50?text=Vit', parent_category_id: 1 },
    { key: 5, id_category: 5, name_category: 'Khoáng chất', description: 'Con của danh mục Thực phẩm chức năng', image_category: 'https://placehold.co/50x50?text=Khoang', parent_category_id: 2 },
    { key: 6, id_category: 6, name_category: 'Sữa rửa mặt', description: 'Con của danh mục Thực phẩm chức năng', image_category: 'https://placehold.co/50x50?text=SRM', parent_category_id: 3 },
    { key: 7, id_category: 7, name_category: 'Kem dưỡng da', description: 'Con của danh mục Thực phẩm chức năng', image_category: 'https://placehold.co/50x50?text=Kem', parent_category_id: 3 },
    { key: 8, id_category: 8, name_category: 'Dầu gội', description: 'Con của danh mục Thực phẩm chức năng', image_category: 'https://placehold.co/50x50?text=DauGoi', parent_category_id: 3 },
    { key: 14, id_category: 14, name_category: 'Thiết bị y tế', description: 'Con của danh mục Thực phẩm chức năng', image_category: 'https://placehold.co/50x50?text=TBYT', parent_category_id: null },
    { key: 15, id_category: 15, name_category: 'Khẩu trang', description: 'Con của danh mục Thực phẩm chức năng', image_category: 'https://placehold.co/50x50?text=KT', parent_category_id: null },
];

const AdminCategoryList = () => {
    const [searchText, setSearchText] = useState('');
    const [categories, setCategories] = useState(initialCategories);

    const handleDelete = (key) => {
        const newData = categories.filter((item) => item.key !== key);
        setCategories(newData);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id_category',
            key: 'id_category',
            width: 80,
        },
        {
            title: 'Image',
            dataIndex: 'image_category',
            key: 'image_category',
            width: 100,
            render: (text) => (
                <Image src={text} alt="category" width={50} height={50} style={{ objectFit: 'cover' }} />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name_category',
            key: 'name_category',
            filteredValue: [searchText],
            onFilter: (value, record) =>
                record.name_category.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Parent Category ID',
            dataIndex: 'parent_category_id',
            key: 'parent_category_id',
            render: (text) => text ? <Tag color="blue">{text}</Tag> : <Tag color="green">ROOT</Tag>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined />} size="small" />
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const parentCounts = {};
    categories.forEach(cat => {
        if (cat.parent_category_id) {
            parentCounts[cat.parent_category_id] = (parentCounts[cat.parent_category_id] || 0) + 1;
        }
    });

    const chartData = Object.keys(parentCounts).map(parentId => {
        const parentName = categories.find(c => c.id_category === parseInt(parentId))?.name_category || `ID ${parentId}`;
        return {
            name: parentName,
            count: parentCounts[parentId]
        };
    });

    return (
        <div className="admin-category-list">
            <div className="category-list-header">
                <Input
                    placeholder="Search categories..."
                    prefix={<SearchOutlined />}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
                <Button type="primary" icon={<PlusOutlined />}>Add Category</Button>
            </div>

            <Table
                columns={columns}
                dataSource={categories}
                pagination={{ pageSize: 5 }}
                rowKey="key"
                className="category-table"
            />

            <Row style={{ marginTop: 24 }}>
                <Col span={24}>
                    <Card title="Subcategories Distribution (by Parent)" bordered={false}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <RechartsTooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" name="Number of Subcategories" barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminCategoryList;
