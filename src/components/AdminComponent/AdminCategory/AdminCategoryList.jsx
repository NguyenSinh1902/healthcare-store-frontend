import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Tag, Popconfirm, Card, Row, Col, Image, Modal, Form, Select, Upload, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../../../services/categoryService';
import Loading from '../../Loading/Loading';
import './AdminCategory.css';

const { Option } = Select;
const { TextArea } = Input;

const AdminCategoryList = () => {
    const [searchText, setSearchText] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await getAllCategories();
            if (response && response.success) {
                setCategories(response.data);
            } else {
                message.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            message.error('An error occurred while fetching categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await deleteCategory(id);
            if (response && response.success) {
                message.success('Category deleted successfully');
                fetchCategories();
            } else {
                message.error('Failed to delete category');
            }
        } catch (error) {
            console.error('Delete error:', error);
            message.error('An error occurred while deleting');
        }
    };

    const showAddModal = () => {
        setEditingCategory(null);
        form.resetFields();
        setFileList([]);
        setIsModalVisible(true);
    };

    const showEditModal = (record) => {
        setEditingCategory(record);
        form.setFieldsValue({
            nameCategory: record.nameCategory,
            description: record.description,
            parentCategoryId: record.parentCategoryId,
        });
        setFileList([]);
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setFileList([]);
    };

    const handleModalOk = async () => {
        setSubmitLoading(true);
        try {
            const values = await form.validateFields();
            const formData = new FormData();

            formData.append('nameCategory', values.nameCategory);
            formData.append('description', values.description);
            if (values.parentCategoryId) {
                formData.append('parentCategoryId', values.parentCategoryId);
            }

            if (fileList.length > 0) {
                // Use originFileObj from the state directly
                formData.append('image', fileList[0]);
            }

            let response;
            if (editingCategory) {
                response = await updateCategory(editingCategory.idCategory, formData);
            } else {
                response = await createCategory(formData);
            }

            if (response && response.success) {
                message.success(`Category ${editingCategory ? 'updated' : 'created'} successfully`);
                setIsModalVisible(false);
                form.resetFields();
                setFileList([]);
                fetchCategories();
            } else {
                message.error(response?.message || 'Operation failed');
            }
        } catch (error) {
            console.error('Submit error:', error);
            message.error('An error occurred while saving category');
        } finally {
            setSubmitLoading(false);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'idCategory',
            key: 'idCategory',
            width: 80,
            sorter: (a, b) => a.idCategory - b.idCategory,
        },
        {
            title: 'Image',
            dataIndex: 'imageCategory',
            key: 'imageCategory',
            width: 100,
            render: (text) => (
                <Image src={text} alt="category" width={50} height={50} style={{ objectFit: 'cover' }} />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'nameCategory',
            key: 'nameCategory',
            filteredValue: [searchText],
            onFilter: (value, record) =>
                record.nameCategory.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Parent Category',
            dataIndex: 'parentCategoryId',
            key: 'parentCategoryId',
            render: (parentId) => {
                if (!parentId) return <Tag color="green">ROOT</Tag>;
                const parent = categories.find(c => c.idCategory === parentId);
                return <Tag color="blue">{parent ? parent.nameCategory : parentId}</Tag>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => showEditModal(record)} />
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.idCategory)}>
                        <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Prepare data for chart: Number of subcategories per parent category
    const parentCounts = {};
    categories.forEach(cat => {
        if (cat.parentCategoryId) {
            parentCounts[cat.parentCategoryId] = (parentCounts[cat.parentCategoryId] || 0) + 1;
        }
    });

    const chartData = Object.keys(parentCounts).map(parentId => {
        const parentName = categories.find(c => c.idCategory === parseInt(parentId))?.nameCategory || `ID ${parentId}`;
        return {
            name: parentName,
            count: parentCounts[parentId]
        };
    });

    return (
        <div className="admin-category-list">
            {submitLoading && <Loading fullscreen tip={`${editingCategory ? 'Updating' : 'Creating'} category...`} />}
            <div className="category-list-header">
                <Input
                    placeholder="Search categories..."
                    prefix={<SearchOutlined />}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>Add Category</Button>
            </div>

            <Table
                columns={columns}
                dataSource={categories}
                pagination={{ pageSize: 5 }}
                rowKey="idCategory"
                loading={loading}
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

            <Modal
                title={editingCategory ? 'Edit Category' : 'Add New Category'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                maskClosable={false}
            >
                <Form layout="vertical" form={form}>
                    <Form.Item
                        name="nameCategory"
                        label="Category Name"
                        rules={[{ required: true, message: 'Please enter category name' }]}
                    >
                        <Input placeholder="e.g. Antibiotics" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter description' }]}
                    >
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item
                        name="parentCategoryId"
                        label="Parent Category (Optional)"
                    >
                        <Select
                            allowClear
                            placeholder="Select a parent category"
                            showSearch
                            optionFilterProp="children"
                        >
                            {categories
                                .filter(c => c.idCategory !== editingCategory?.idCategory) // Avoid self-parenting
                                .map(c => (
                                    <Option key={c.idCategory} value={c.idCategory}>
                                        {c.nameCategory} (ID: {c.idCategory})
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Image">
                        <Upload
                            listType="picture"
                            maxCount={1}
                            fileList={fileList.length > 0 ? fileList.map(f => ({ ...f, status: 'done' })) : []} // Visual hack if needed, but managing own state is better
                            onRemove={() => setFileList([])}
                            beforeUpload={(file) => {
                                setFileList([file]);
                                return false;
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Select Image</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminCategoryList;
