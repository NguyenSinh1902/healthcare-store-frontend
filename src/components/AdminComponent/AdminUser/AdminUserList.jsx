import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Switch, Popconfirm, Avatar } from 'antd'; // Bỏ message, Row, Col, Card
import { SearchOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import './AdminUser.css';

const initialUsers = [
    { key: 1, id_user: 1, address: '88 Nguyễn Văn Cừ...', created_at: '2025-11-10 12:08:45', email: 'A01@gmail.com', full_name: 'Nguyễn Xuân Phát', role: 'USER', avatar_url: 'https://placehold.co/50x50?text=Phat', status: 'INACTIVE' },
    { key: 2, id_user: 2, address: '55 Nguyễn Văn B...', created_at: '2025-11-11 13:02:21', email: 'A02@gmail.com', full_name: 'Nguyễn Xuân A', role: 'USER', avatar_url: 'https://placehold.co/50x50?text=A', status: 'ACTIVE' },
    { key: 3, id_user: 3, address: null, created_at: '2025-11-11 13:06:03', email: 'A03@gmail.com', full_name: 'Nguyen Van CDEF', role: 'USER', avatar_url: null, status: 'ACTIVE' },

];

const AdminUserList = () => {
    const [users] = useState(initialUsers);
    const [searchText, setSearchText] = useState('');


    const columns = [
        { title: 'ID', dataIndex: 'id_user', key: 'id_user', width: 60 },
        {
            title: 'Avatar',
            dataIndex: 'avatar_url',
            key: 'avatar_url',
            width: 80,
            render: (url) => (<Avatar src={url} icon={<UserOutlined />} size="large" />), // Render Avatar
        },
        { title: 'Full Name', dataIndex: 'full_name', key: 'full_name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Role', dataIndex: 'role', key: 'role', width: 100, render: (role) => <Tag color={role === 'ADMIN' ? 'red' : 'blue'}>{role}</Tag> },
        { title: 'Created At', dataIndex: 'created_at', key: 'created_at', width: 180, render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss') },
        { title: 'Status', dataIndex: 'status', key: 'status', width: 100, render: (status) => (<Switch checked={status === 'ACTIVE'} checkedChildren="Active" unCheckedChildren="Inactive" />) }, // Switch UI
        { title: 'Action', key: 'action', width: 100 }, // Cột Action trống
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