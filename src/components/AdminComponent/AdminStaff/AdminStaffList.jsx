import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Switch, Popconfirm, Avatar } from 'antd';
import { SearchOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import './AdminStaff.css';

const initialStaff = [
    { key: 11, id_user: 11, created_at: '2025-11-28 16:36:24', email: 'khoi2@gmail.com', full_name: 'sinh', role: 'ADMIN', avatar_url: null, status: 'INACTIVE' },

];

const AdminStaffList = () => {
    const [staff] = useState(initialStaff);
    const [searchText, setSearchText] = useState('');


    const columns = [
        { title: 'ID', dataIndex: 'id_user', key: 'id_user', width: 60 },
        { title: 'Avatar', dataIndex: 'avatar_url', key: 'avatar_url', width: 80, render: (url) => (<Avatar src={url} icon={<UserOutlined />} size="large" />) },
        { title: 'Full Name', dataIndex: 'full_name', key: 'full_name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Role', dataIndex: 'role', key: 'role', width: 100, render: (role) => <Tag color="red">{role}</Tag> },
        { title: 'Created At', dataIndex: 'created_at', key: 'created_at', width: 180, render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss') },
        { title: 'Status', dataIndex: 'status', key: 'status', width: 100, render: (status) => (<Switch checked={status === 'ACTIVE'} checkedChildren="Active" unCheckedChildren="Inactive" />) }, // Switch UI
        { title: 'Action', key: 'action', width: 100 }, // Cột Action trống
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