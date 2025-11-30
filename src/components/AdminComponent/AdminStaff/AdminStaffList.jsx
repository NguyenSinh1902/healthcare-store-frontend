import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Switch, Popconfirm, message, Avatar } from 'antd'; // Thêm message
import { SearchOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import './AdminStaff.css';

const initialStaff = [
    { key: 11, id_user: 11, address: null, created_at: '2025-11-28 16:36:24', email: 'khoi2@gmail.com', full_name: 'sinh', phone: null, role: 'ADMIN', avatar_url: null, date_of_birth: null, status: 'INACTIVE' },
    { key: 12, id_user: 12, address: null, created_at: '2025-11-28 16:38:43', email: 'ABC02@gmail.com', full_name: 'Nguyen Van Dac', phone: null, role: 'ADMIN', avatar_url: null, date_of_birth: null, status: 'ACTIVE' },
    { key: 13, id_user: 13, address: null, created_at: '2025-11-28 16:42:06', email: 'khoi02@gmail.com', full_name: 'sinh', phone: null, role: 'ADMIN', avatar_url: null, date_of_birth: null, status: 'ACTIVE' },
    { key: 14, id_user: 14, address: null, created_at: '2025-11-28 16:43:37', email: 'khoi03@gmail.com', full_name: 'sinh', phone: null, role: 'ADMIN', avatar_url: null, date_of_birth: null, status: 'ACTIVE' },
    { key: 15, id_user: 15, address: null, created_at: '2025-11-28 16:43:56', email: 'khoi04@gmail.com', full_name: 'sinh', phone: null, role: 'ADMIN', avatar_url: null, date_of_birth: null, status: 'ACTIVE' },
];

const AdminStaffList = () => {
    const [staff, setStaff] = useState(initialStaff);
    const [searchText, setSearchText] = useState('');

    const handleStatusChange = (checked, record) => {
        const newStatus = checked ? 'ACTIVE' : 'INACTIVE';
        const updatedStaff = staff.map(user => {
            if (user.id_user === record.id_user) {
                return { ...user, status: newStatus };
            }
            return user;
        });
        setStaff(updatedStaff);
        message.success(`Staff ${record.full_name} is now ${newStatus}`);
    };

    const handleDelete = (key) => {
        const newData = staff.filter((item) => item.key !== key);
        setStaff(newData);
        message.success('Staff deleted successfully');
    };

    const columns = [
        { title: 'ID', dataIndex: 'id_user', key: 'id_user', width: 60 },
        { title: 'Avatar', dataIndex: 'avatar_url', key: 'avatar_url', width: 80, render: (url) => (<Avatar src={url} icon={<UserOutlined />} size="large" />) },
        {
            title: 'Full Name',
            dataIndex: 'full_name',
            key: 'full_name',
            filteredValue: [searchText],
            onFilter: (value, record) =>
                record.full_name.toLowerCase().includes(value.toLowerCase()) ||
                record.email.toLowerCase().includes(value.toLowerCase()),
        },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Role', dataIndex: 'role', key: 'role', width: 100, render: (role) => <Tag color="red">{role}</Tag> },
        { title: 'Created At', dataIndex: 'created_at', key: 'created_at', width: 180, render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss') },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status, record) => (
                <Switch
                    checked={status === 'ACTIVE'}
                    onChange={(checked) => handleStatusChange(checked, record)}
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
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
        <div className="admin-staff-list">
            <div className="staff-list-header">
                <Input
                    placeholder="Search by Name or Email..."
                    prefix={<SearchOutlined />}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
            </div>

            <Table
                columns={columns}
                dataSource={staff}
                pagination={{ pageSize: 10 }}
                rowKey="key"
                className="staff-table"
                scroll={{ x: 1000 }}
            />
        </div>
    );
};

export default AdminStaffList;