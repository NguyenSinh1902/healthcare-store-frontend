import React, { useState, useEffect } from 'react';
import { Layout, theme, Card, Form, Input, DatePicker, Button, message, Upload } from 'antd';
import { EditOutlined, SaveOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import AdminSidebar from '../../../components/AdminComponent/AdminSidebar/AdminSidebar';
import AdminHeader from '../../../components/AdminComponent/AdminHeader/AdminHeader';
import Loading from '../../../components/Loading/Loading';
import { getProfile, updateProfile } from '../../../services/profileService';
import './AdminProfilePage.css';

const { Content } = Layout;

const AdminProfilePage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const [form] = Form.useForm();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const response = await getProfile();
            if (response && response.success) {
                setProfile(response.data);
                form.setFieldsValue({
                    fullName: response.data.fullName,
                    phone: response.data.phone,
                    address: response.data.address,
                    dateOfBirth: response.data.dateOfBirth ? dayjs(response.data.dateOfBirth) : null,
                    avatarUrl: response.data.avatarUrl
                });
            } else {
                message.error('Failed to load profile');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            message.error('Error fetching profile');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        form.setFieldsValue({
            fullName: profile.fullName,
            phone: profile.phone,
            address: profile.address,
            dateOfBirth: profile.dateOfBirth ? dayjs(profile.dateOfBirth) : null
        });
        setAvatarFile(null);
        setIsEditing(false);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const updateData = {
                fullName: values.fullName,
                phone: values.phone,
                address: values.address,
                dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format('YYYY-MM-DD') : null
            };

            // Add avatar file if selected
            if (avatarFile) {
                updateData.avatar = avatarFile;
            }

            const response = await updateProfile(updateData);
            if (response && response.success) {
                message.success('Profile updated successfully');
                setProfile(response.data);
                setAvatarFile(null);
                setIsEditing(false);
            } else {
                message.error(response.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Update failed:', error);
            message.error('Failed to update profile');
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AdminSidebar collapsed={collapsed} />
            <Layout>
                <AdminHeader
                    collapsed={collapsed}
                    onToggleCollapse={() => setCollapsed(!collapsed)}
                    colorBgContainer={colorBgContainer}
                />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <div className="admin-profile-header">
                        <h2>Admin Profile</h2>
                        <div className="profile-actions">
                            {!isEditing ? (
                                <Button
                                    type="primary"
                                    icon={<EditOutlined />}
                                    onClick={handleEdit}
                                >
                                    Edit Profile
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        icon={<CloseOutlined />}
                                        onClick={handleCancel}
                                        style={{ marginRight: 8 }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="primary"
                                        icon={<SaveOutlined />}
                                        onClick={handleSave}
                                    >
                                        Save Changes
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {loading ? (
                        <Loading fullscreen tip="Loading profile..." />
                    ) : (
                        <Card
                            bordered={false}
                            style={{ marginTop: 24 }}
                            className="profile-card"
                        >
                            <Form
                                form={form}
                                layout="vertical"
                                disabled={!isEditing}
                            >
                                <Form.Item
                                    name="fullName"
                                    label="Full Name"
                                    rules={[{ required: true, message: 'Please enter your full name' }]}
                                >
                                    <Input size="large" />
                                </Form.Item>

                                <Form.Item
                                    label="Email Address"
                                >
                                    <Input
                                        size="large"
                                        value={profile?.email}
                                        disabled
                                        placeholder="Email cannot be changed"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="phone"
                                    label="Phone Number"
                                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                                >
                                    <Input size="large" />
                                </Form.Item>

                                <Form.Item
                                    name="address"
                                    label="Address"
                                >
                                    <Input.TextArea rows={3} size="large" />
                                </Form.Item>

                                <Form.Item
                                    name="dateOfBirth"
                                    label="Date of Birth"
                                >
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        size="large"
                                        format="YYYY-MM-DD"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Avatar"
                                >
                                    <Upload
                                        beforeUpload={(file) => {
                                            setAvatarFile(file);
                                            return false; // Prevent auto upload
                                        }}
                                        onRemove={() => setAvatarFile(null)}
                                        maxCount={1}
                                        accept="image/*"
                                        disabled={!isEditing}
                                    >
                                        <Button icon={<UploadOutlined />} size="large" disabled={!isEditing}>
                                            Select Avatar Image
                                        </Button>
                                    </Upload>
                                </Form.Item>
                            </Form>

                            {profile?.avatarUrl && (
                                <div style={{ marginTop: 16, textAlign: 'center' }}>
                                    <img
                                        src={profile.avatarUrl}
                                        alt="Avatar Preview"
                                        style={{
                                            width: 120,
                                            height: 120,
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '3px solid #1890ff'
                                        }}
                                    />
                                </div>
                            )}
                        </Card>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminProfilePage;
