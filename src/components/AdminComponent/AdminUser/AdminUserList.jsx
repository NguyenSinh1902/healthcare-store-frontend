import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Tag, Switch, Popconfirm, message, Avatar, Row, Col, Card } from 'antd';
import { SearchOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import './AdminUser.css';
import { getAllAdminUsers, updateUserStatus, deleteUser } from '../../../services/adminUserService';

// Mock Data based on user request


const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch users from backend (excluding BANNED)
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getAllAdminUsers();
            if (response && response.success) {
                // Transform to match table column keys
                const transformed = response.data.map(u => ({
                    key: u.idUser,
                    id_user: u.idUser,
                    full_name: u.fullName,
                    email: u.email,
                    avatar_url: u.avatarUrl,
                    role: u.role,
                    status: u.status,
                    created_at: u.createdAt,
                }));
                setUsers(transformed);
            } else {
                message.error('Failed to fetch users');
            }
        } catch (err) {
            console.error('Fetch users error:', err);
            message.error('Error fetching users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const [searchText, setSearchText] = useState('');

    const handleStatusChange = async (checked, record) => {
        const newStatus = checked ? 'ACTIVE' : 'INACTIVE';
        try {
            const response = await updateUserStatus(record.id_user, newStatus);
            if (response && response.success) {
                message.success(`User ${record.full_name} is now ${newStatus}`);
                fetchUsers();
            } else {
                message.error('Failed to update status');
            }
        } catch (err) {
            console.error('Status update error:', err);
            message.error('Error updating status');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteUser(id);
            if (response && response.success) {
                message.success('User deleted successfully');
                fetchUsers();
            } else {
                message.error('Failed to delete user');
            }
        } catch (err) {
            console.error('Delete error:', err);
            message.error('Error deleting user');
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id_user',
            key: 'id_user',
            width: 60,
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar_url',
            key: 'avatar_url',
            width: 80,
            render: (url) => (
                <Avatar src={url} icon={<UserOutlined />} size="large" />
            ),
        },
        {
            title: 'Full Name',
            dataIndex: 'full_name',
            key: 'full_name',
            filteredValue: [searchText],
            onFilter: (value, record) =>
                record.full_name.toLowerCase().includes(value.toLowerCase()) ||
                record.email.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 100,
            render: (role) => <Tag color={role === 'ADMIN' ? 'red' : 'blue'}>{role}</Tag>,
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 180,
            render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
        },
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

    // Prepare Data for Charts
    const statusCounts = {};
    users.forEach(user => {
        statusCounts[user.status] = (statusCounts[user.status] || 0) + 1;
    });
    const pieData = Object.keys(statusCounts).map(status => ({
        name: status,
        value: statusCounts[status]
    }));
    const COLORS = ['#00C49F', '#FF8042'];

    // Group by Registration Date
    const registrationByDate = {};
    users.forEach(user => {
        const date = dayjs(user.created_at).format('YYYY-MM-DD');
        registrationByDate[date] = (registrationByDate[date] || 0) + 1;
    });
    const barData = Object.keys(registrationByDate).map(date => ({
        date,
        count: registrationByDate[date]
    })).sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());

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
                rowKey="id_user"
                loading={loading}
                className="user-table"
                scroll={{ x: 1000 }}
            />

            {/* Charts Section */}
            <Row gutter={24} style={{ marginTop: 24 }}>
                <Col span={12}>
                    <Card title="User Status Distribution" bordered={false}>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="New User Registrations (Daily)" bordered={false}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis allowDecimals={false} />
                                <RechartsTooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" name="New Users" barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminUserList;
