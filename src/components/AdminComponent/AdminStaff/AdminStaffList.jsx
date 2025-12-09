import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Tag, Switch, Popconfirm, message, Avatar, Row, Col, Card } from 'antd';
import { SearchOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import './AdminStaff.css';
import { getAllAdminStaff, updateStaffStatus, deleteStaff } from '../../../services/adminStaffService';

// Mock Data for Staff (Admins)
// Data will be fetched from backend via adminStaffService

const AdminStaffList = () => {
    const [staff, setStaff] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch staff from backend (ADMIN role)
    const fetchStaff = async () => {
        setLoading(true);
        try {
            const response = await getAllAdminStaff();
            if (response && response.success) {
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
                setStaff(transformed);
            } else {
                message.error('Failed to fetch staff');
            }
        } catch (err) {
            console.error('Fetch staff error:', err);
            message.error('Error fetching staff');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);


    const handleStatusChange = async (checked, record) => {
        const newStatus = checked ? 'ACTIVE' : 'INACTIVE';
        try {
            await updateStaffStatus(record.id_user, newStatus);
            const updatedStaff = staff.map(user => {
                if (user.id_user === record.id_user) {
                    return { ...user, status: newStatus };
                }
                return user;
            });
            setStaff(updatedStaff);
            message.success(`Staff ${record.full_name} status updated to ${newStatus}`);
        } catch (err) {
            console.error(err);
            message.error('Failed to update staff status');
        }
    };

    const handleDelete = async (key) => {
        const record = staff.find(item => item.key === key);
        if (!record) return;
        try {
            await deleteStaff(record.id_user);
            const newData = staff.filter((item) => item.key !== key);
            setStaff(newData);
            message.success('Staff deleted successfully');
        } catch (err) {
            console.error(err);
            message.error('Failed to delete staff');
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
            render: (role) => <Tag color="red">{role}</Tag>,
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
    staff.forEach(user => {
        statusCounts[user.status] = (statusCounts[user.status] || 0) + 1;
    });
    const pieData = Object.keys(statusCounts).map(status => ({
        name: status,
        value: statusCounts[status]
    }));
    const COLORS = ['#00C49F', '#FF8042'];

    // Group by Registration Date
    const registrationByDate = {};
    staff.forEach(user => {
        const date = dayjs(user.created_at).format('YYYY-MM-DD');
        registrationByDate[date] = (registrationByDate[date] || 0) + 1;
    });
    const barData = Object.keys(registrationByDate).map(date => ({
        date,
        count: registrationByDate[date]
    })).sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());

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
                loading={loading}
                className="staff-table"
                scroll={{ x: 1000 }}
            />

            {/* Charts Section */}
            <Row gutter={24} style={{ marginTop: 24 }}>
                <Col span={12}>
                    <Card title="Staff Status Distribution" bordered={false}>
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
                    <Card title="New Staff Registrations (Daily)" bordered={false}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis allowDecimals={false} />
                                <RechartsTooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" name="New Staff" barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminStaffList;
