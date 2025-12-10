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
    const [updateLoading, setUpdateLoading] = useState(false); // Thêm state loading cho update
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
        setUpdateLoading(true); // Bắt đầu loading
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
        } finally {
            setUpdateLoading(false); // Kết thúc loading
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
                        position: 'relative' // Để Loading có thể hiển thị đè lên nếu cần (tuy nhiên Loading component dùng fixed nên ko ảnh hưởng lắm)
                    }}
                >
                    {/* Hiển thị Loading khi đang update */}
                    {updateLoading && <Loading fullscreen tip="Updating profile..." />}


                    {loading ? (
                        <Loading fullscreen tip="Loading profile..." />
                    ) : (
                        <div className="profile-container">
                            {/* --- COVER & AVATAR SECTION --- */}
                            <div className="profile-cover-section">
                                <div className="cover-photo">
                                    {/* Có thể thay bằng ảnh thật nếu API có field coverUrl */}
                                    <img
                                        src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1600&q=80"
                                        alt="Cover"
                                    />
                                </div>

                                <div className="profile-avatar-wrapper">
                                    <div className="avatar-box">
                                        <img
                                            src={profile?.avatarUrl || "https://placehold.co/150x150"}
                                            alt="Avatar"
                                            className="avatar-img"
                                        />
                                        {isEditing && (
                                            <Upload
                                                beforeUpload={(file) => {
                                                    setAvatarFile(file);
                                                    return false;
                                                }}
                                                showUploadList={false}
                                                accept="image/*"
                                            >
                                                <div className="avatar-upload-overlay">
                                                    <UploadOutlined style={{ fontSize: 24, color: 'white' }} />
                                                </div>
                                            </Upload>
                                        )}
                                    </div>
                                    <h2 className="profile-name">{profile?.fullName || "Admin User"}</h2>
                                    <p className="profile-role">{profile?.role || "Administrator"}</p>
                                </div>
                            </div>

                            {/* --- FORM SECTION --- */}
                            <div className="profile-content-body">
                                <div className="profile-card-custom">
                                    <div className="profile-card-header">
                                        <h3>Personal Information</h3>
                                        <div className="header-actions">
                                            {!isEditing ? (
                                                <Button
                                                    type="primary"
                                                    shape="round"
                                                    icon={<EditOutlined />}
                                                    onClick={handleEdit}
                                                >
                                                    Edit Profile
                                                </Button>
                                            ) : (
                                                <div className="edit-actions-group">
                                                    <Button
                                                        shape="round"
                                                        onClick={handleCancel}
                                                        icon={<CloseOutlined />}
                                                        className="btn-cancel"
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        type="primary"
                                                        shape="round"
                                                        icon={<SaveOutlined />}
                                                        onClick={handleSave}
                                                        className="btn-save"
                                                    >
                                                        Save
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <Form
                                        form={form}
                                        layout="vertical"
                                        disabled={!isEditing}
                                        className="profile-form-grid"
                                    >
                                        <div className="form-col">
                                            <Form.Item
                                                name="fullName"
                                                label="Full Name"
                                                rules={[{ required: true, message: 'Please enter your full name' }]}
                                            >
                                                <Input size="large" />
                                            </Form.Item>

                                            <Form.Item label="Email Address">
                                                <Input
                                                    size="large"
                                                    value={profile?.email}
                                                    disabled
                                                    className="input-disabled-custom"
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className="form-col">
                                            <Form.Item
                                                name="phone"
                                                label="Phone Number"
                                            >
                                                <Input size="large" />
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
                                        </div>

                                        <div className="form-full-width">
                                            <Form.Item
                                                name="address"
                                                label="Address"
                                            >
                                                <Input.TextArea rows={3} size="large" />
                                            </Form.Item>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminProfilePage;
