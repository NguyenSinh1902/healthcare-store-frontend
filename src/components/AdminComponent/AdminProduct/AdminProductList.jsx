import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Tag, Popconfirm, Card, Row, Col, Tooltip, Image, message, Modal, Form, InputNumber, Select, Upload } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../../../services/productService';
import Loading from '../../Loading/Loading';
import './AdminProduct.css';

const { Option } = Select;
const { TextArea } = Input;

const AdminProductList = () => {
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [thumbnailFileList, setThumbnailFileList] = useState([]);

    // Fetch products from API
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await getAllProducts();
            if (response && response.success) {
                // Determine if 'active' field exists and filter if necessary, 
                // but user said API returns active ones for GET /all.
                // However, user also said "get all này toàn sản phẩm "active": true" 
                // and for delete we should probably just re-fetch.
                setProducts(response.data);
            } else {
                message.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            message.error('An error occurred while fetching products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await deleteProduct(id);
            if (response && response.success) {
                message.success('Product deleted successfully');
                fetchProducts(); // Refresh list
            } else {
                message.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Delete error:', error);
            message.error('An error occurred while deleting');
        }
    };

    const showAddModal = () => {
        setEditingProduct(null);
        form.resetFields();
        setFileList([]);
        setThumbnailFileList([]);
        setIsModalVisible(true);
    };

    const showEditModal = (record) => {
        setEditingProduct(record);
        form.setFieldsValue({
            nameProduct: record.nameProduct,
            brand: record.brand,
            oldPrice: record.oldPrice,
            discountPercent: record.discountPercent,
            stockQuantity: record.stockQuantity,
            description: record.description,
            information: record.information,
            idCategory: record.idCategory, // API returns idCategory as number
            productGroup: record.productGroup,
        });
        // We don't pre-fill file inputs with objects usually, just show current image text if needed, 
        // but for now we'll start with empty file lists. User can upload new ones to replace.
        setFileList([]);
        setThumbnailFileList([]);
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setFileList([]);
        setThumbnailFileList([]);
    };

    const handleModalOk = async () => {
        setSubmitLoading(true);
        try {
            const tempValues = await form.validateFields();
            const formData = new FormData();

            formData.append('nameProduct', tempValues.nameProduct);
            formData.append('brand', tempValues.brand);
            // formData.append('price', ''); // User said price is empty
            formData.append('oldPrice', tempValues.oldPrice);
            formData.append('discountPercent', tempValues.discountPercent);
            formData.append('stockQuantity', tempValues.stockQuantity);
            formData.append('description', tempValues.description);
            formData.append('information', tempValues.information);
            formData.append('idCategory', tempValues.idCategory);
            formData.append('productGroup', tempValues.productGroup);

            // 👇 SỬA ĐOẠN XỬ LÝ ẢNH CHÍNH
            if (fileList.length > 0) {
                // fileList[0] chính là file rồi, không cần .originFileObj
                formData.append('image', fileList[0]);
            }

            // 👇 SỬA ĐOẠN XỬ LÝ THUMBNAILS
            if (thumbnailFileList.length > 0) {
                thumbnailFileList.forEach(file => {
                    // Tương tự, file ở đây là raw file do beforeUpload trả về
                    formData.append('thumbnailFiles', file);
                });
            }

            let response;
            if (editingProduct) {
                response = await updateProduct(editingProduct.idProduct, formData);
            } else {
                response = await createProduct(formData);
            }

            if (response && response.success) {
                message.success(`Product ${editingProduct ? 'updated' : 'created'} successfully`);
                setIsModalVisible(false);
                form.resetFields();
                setFileList([]);
                setThumbnailFileList([]);
                fetchProducts();
            } else {
                message.error(response?.message || 'Operation failed');
            }

        } catch (error) {
            console.error('Submit error:', error);
            message.error('An error occurred while saving product');
        } finally {
            setSubmitLoading(false);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'idProduct',
            key: 'idProduct',
            width: 80,
            fixed: 'left',
            sorter: (a, b) => a.idProduct - b.idProduct,
        },
        {
            title: 'Name',
            dataIndex: 'nameProduct',
            key: 'nameProduct',
            width: 150,
            fixed: 'left',
            filteredValue: [searchText],
            onFilter: (value, record) =>
                record.nameProduct.toLowerCase().includes(value.toLowerCase()) ||
                String(record.idProduct).includes(value.toLowerCase()),
        },
        {
            title: 'Image',
            dataIndex: 'imageProduct',
            key: 'imageProduct',
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
            title: 'Category',
            dataIndex: 'categoryName', // Display name, but edit uses idCategory
            key: 'categoryName',
            width: 120,
        },
        {
            title: 'Group',
            dataIndex: 'productGroup',
            key: 'productGroup',
            width: 120,
            render: (text) => <Tag color="blue">{text}</Tag>
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 100,
            render: (price) => <span style={{ fontWeight: 'bold' }}>${price}</span>,
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Old Price',
            dataIndex: 'oldPrice',
            key: 'oldPrice',
            width: 100,
            render: (price) => price ? <span style={{ textDecoration: 'line-through', color: '#999' }}>${price}</span> : '-',
        },
        {
            title: 'Discount',
            dataIndex: 'discountPercent',
            key: 'discountPercent',
            width: 100,
            render: (percent) => percent > 0 ? <Tag color="red">-{percent}%</Tag> : '-',
            sorter: (a, b) => a.discountPercent - b.discountPercent,
        },
        {
            title: 'Stock',
            dataIndex: 'stockQuantity',
            key: 'stockQuantity',
            width: 100,
            sorter: (a, b) => a.stockQuantity - b.stockQuantity,
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
                    <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => showEditModal(record)} />
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.idProduct)}>
                        <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Prepare data for chart (Top 10 by stock)
    const stockChartData = [...products]
        .sort((a, b) => b.stockQuantity - a.stockQuantity)
        .slice(0, 10)
        .map(p => ({
            name: p.nameProduct,
            stock: p.stockQuantity
        }));

    // Prepare data for chart (Top 10 by discount)
    const discountChartData = [...products]
        .sort((a, b) => b.discountPercent - a.discountPercent)
        .slice(0, 10)
        .map(p => ({
            name: p.nameProduct,
            discount: p.discountPercent
        }));

    return (
        <div className="admin-product-list">
            {submitLoading && <Loading fullscreen tip={`${editingProduct ? 'Updating' : 'Creating'} product...`} />}
            <div className="product-list-header">
                <Input
                    placeholder="Search products..."
                    prefix={<SearchOutlined />}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>Add Product</Button>
            </div>

            <Table
                columns={columns}
                dataSource={products}
                pagination={{ pageSize: 5 }}
                rowKey="idProduct"
                loading={loading}
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

            {/* Modal for Add/Edit Product */}
            <Modal
                title={editingProduct ? 'Edit Product' : 'Add New Product'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                width={800}
                maskClosable={false}
            >
                <Form layout="vertical" form={form}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="nameProduct"
                                label="Product Name"
                                rules={[{ required: true, message: 'Please enter product name' }]}
                            >
                                <Input placeholder="e.g. Sữa rửa mặt Cerave" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="brand"
                                label="Brand"
                                rules={[{ required: true, message: 'Please enter brand' }]}
                            >
                                <Input placeholder="e.g. BlackPink" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="oldPrice"
                                label="Old Price"
                                rules={[{ required: true, message: 'Please enter old price' }]}
                            >
                                <InputNumber style={{ width: '100%' }} min={0} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="discountPercent"
                                label="Discount (%)"
                                rules={[{ required: true, message: 'Please enter discount' }]}
                            >
                                <InputNumber style={{ width: '100%' }} min={0} max={100} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="stockQuantity"
                                label="Stock Quantity"
                                rules={[{ required: true, message: 'Please enter quantity' }]}
                            >
                                <InputNumber style={{ width: '100%' }} min={0} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="idCategory"
                                label="Category ID"
                                rules={[{ required: true, message: 'Please enter category ID' }]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="productGroup"
                                label="Product Group"
                                rules={[{ required: true, message: 'Please select group' }]}
                            >
                                <Select>
                                    <Option value="FLASH_SALE">FLASH_SALE</Option>
                                    <Option value="BEST_SELLING">BEST_SELLING</Option>
                                    <Option value="RECOMMENDED">RECOMMENDED</Option>
                                    <Option value="NORMAL">NORMAL</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter description' }]}
                    >
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item
                        name="information"
                        label="Information"
                        rules={[{ required: true, message: 'Please enter information' }]}
                    >
                        <TextArea rows={3} />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Main Image">
                                <Upload
                                    listType="picture"
                                    maxCount={1}
                                    fileList={fileList}
                                    onRemove={() => setFileList([])}
                                    beforeUpload={(file) => {
                                        setFileList([file]);
                                        return false; // Prevent automatic upload
                                    }}
                                >
                                    <Button icon={<UploadOutlined />}>Select Image</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Thumbnail Images">
                                <Upload
                                    listType="picture"
                                    multiple
                                    fileList={thumbnailFileList}
                                    onRemove={(file) => {
                                        const index = thumbnailFileList.indexOf(file);
                                        const newFileList = thumbnailFileList.slice();
                                        newFileList.splice(index, 1);
                                        setThumbnailFileList(newFileList);
                                    }}
                                    beforeUpload={(file) => {
                                        setThumbnailFileList(prev => [...prev, file]);
                                        return false;
                                    }}
                                >
                                    <Button icon={<UploadOutlined />}>Select Thumbnails</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminProductList;
