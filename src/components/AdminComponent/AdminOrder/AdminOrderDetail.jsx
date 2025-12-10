import React from 'react';
import { Table, Image } from 'antd';

const AdminOrderDetail = ({ data }) => {
    const columns = [
        {
            title: 'ID Detail',
            dataIndex: 'id_order_detail',
            key: 'id_order_detail',
        },
        {
            title: 'Product ID',
            dataIndex: 'id_product',
            key: 'id_product',
        },
        {
            title: 'Product Image',
            dataIndex: 'image_product',
            key: 'image_product',
            render: (text) => (
                <Image src={text || "https://placehold.co/50x50"} alt="product" width={50} height={50} style={{ objectFit: 'cover' }} />
            ),
        },
        {
            title: 'Product Name',
            dataIndex: 'name_product',
            key: 'name_product',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Unit Price',
            dataIndex: 'unit_price',
            key: 'unit_price',
            render: (price) => <span>${price}</span>,
        },
        {
            title: 'Total Price',
            dataIndex: 'total_price',
            key: 'total_price',
            render: (price) => <span style={{ fontWeight: 'bold' }}>${price}</span>,
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="id_order_detail"
            size="small"
        />
    );
};

export default AdminOrderDetail;
