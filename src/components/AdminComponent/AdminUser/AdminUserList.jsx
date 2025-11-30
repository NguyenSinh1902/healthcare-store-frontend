import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Switch, Popconfirm, message, Avatar } from 'antd'; // Thêm message
import { SearchOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import './AdminUser.css';

const initialUsers = [
    { key: 1, id_user: 1, address: '88 Nguyễn Văn Cừ, Quận 5, TP.HCM', created_at: '2025-11-10 12:08:45', email: 'A01@gmail.com', full_name: 'Nguyễn Xuân Phát', phone: '0912345678', role: 'USER', avatar_url: 'https://placehold.co/50x50?text=Phat', date_of_birth: '2006-05-25', status: 'INACTIVE' },
    { key: 2, id_user: 2, address: '55 Nguyễn Văn B, Quận 9, TP.HCM', created_at: '2025-11-11 13:02:21', email: 'A02@gmail.com', full_name: 'Nguyễn Xuân A', phone: '0912345678', role: 'USER', avatar_url: 'https://placehold.co/50x50?text=A', date_of_birth: '2007-08-25', status: 'ACTIVE' },
    { key: 3, id_user: 3, address: null, created_at: '2025-11-11 13:06:03', email: 'A03@gmail.com', full_name: 'Nguyen Van CDEF', phone: '0398854463', role: 'USER', avatar_url: null, date_of_birth: null, status: 'ACTIVE' },
    { key: 5, id_user: 5, address: null, created_at: '2025-11-11 16:38:05', email: 'A04@gmail.com', full_name: 'Nguyen Van D', phone: null, role: 'USER', avatar_url: null, date_of_birth: null, status: 'ACTIVE' },
    { key: 6, id_user: 6, address: null, created_at: '2025-11-28 17:57:45', email: 'A045@gmail.com', full_name: 'Nguyen Van Da', phone: null, role: 'USER', avatar_url: null, date_of_birth: null, status: 'ACTIVE' },
    { key: 7, id_user: 7, address: null, created_at: '2025-11-28 16:04:32', email: 'ABC01@gmail.com', full_name: 'Nguyen Van Dac', phone: null, role: 'USER', avatar_url: null, date_of_birth: null, status: 'ACTIVE' },
    { key: 8, id_user: 8, address: null, created_at: '2025-11-28 16:33:44', email: 'khoi@gmail.com', full_name: 'sinh', phone: null, role: 'USER', avatar_url: null, date_of_birth: null, status: 'ACTIVE' },
    { key: 9, id_user: 9, address: null, created_at: '2025-11-28 16:35:00', email: 'khoi1@gmail.com', full_name: 'sinh', phone: null, role: 'USER', avatar_url: null, date_of_birth: null, status: 'ACTIVE' },
];

const AdminUserList = () => {
    const [users, setUsers] = useState(initialUsers);
    const [searchText, setSearchText] = useState('');

    const handleStatusChange = (checked, record) => {
        const newStatus = checked ? 'ACTIVE' : 'INACTIVE';
        const updatedUsers = users.map(user => {
            if (user.id_user === record.id_user) {
                return { ...user, status: newStatus };
            }
            return user;
        });
        setUsers(updatedUsers);
        message.success(`User ${record.full_name} is now ${newStatus}`);
    };

    const handleDelete = (key) => {
        const newData = users.filter((item) => item.key !== key);
        setUsers(newData);
        message.success('User deleted successfully');
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
        { title: 'Role', dataIndex: 'role', key: 'role', width: 100, render: (role) => <Tag color={role === 'ADMIN' ? 'red' : 'blue'}>{role}</Tag> },
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
        <div className="admin-user-list">
            <div className="user-list-header">
                <Input
                    placeholder="Search by Name or Email..."
                    prefix={<SearchOutlined />}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
            </div>

            <Table
                columns={columns}
                dataSource={users}
                pagination={{ pageSize: 10 }}
                rowKey="key"
                className="user-table"
                scroll={{ x: 1000 }}
            />
        </div>
    );
};

export default AdminUserList;