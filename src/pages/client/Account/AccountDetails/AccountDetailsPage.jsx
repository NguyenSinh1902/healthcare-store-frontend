import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form, Input, DatePicker, message, Upload, Button, Image } from 'antd';
import { EditOutlined, UploadOutlined, UserOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import AccountSidebar from '../../../../components/AccountSidebar/AccountSidebar';
import { getProfile, updateProfile } from '../../../../services/profileService';
import Loading from '../../../../components/Loading/Loading';
import AddressAutocomplete from '../../../../components/AddressAutocomplete/AddressAutocomplete';
import './AccountDetailsPage.css';

const AccountDetailsPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await getProfile();
      if (response && response.success) {
        setProfile(response.data);
      } else {
        message.error("Failed to load profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      message.error("Error fetching profile");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    if (profile) {
      form.setFieldsValue({
        fullName: profile.fullName,
        phone: profile.phone,
        address: profile.address,
        dateOfBirth: profile.dateOfBirth ? dayjs(profile.dateOfBirth) : null,
        avatarUrl: profile.avatarUrl
      });
      setIsModalOpen(true);
    }
  };

  const handleUpdate = async () => {
    setUpdateLoading(true); // Start update loading
    try {
      const values = await form.validateFields();
      const updateData = {
        fullName: values.fullName,
        phone: values.phone,
        address: values.address,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format('YYYY-MM-DD') : null,
      };

      // Add avatar file if selected
      if (avatarFile) {
        updateData.avatar = avatarFile;
      }

      const response = await updateProfile(updateData);
      if (response && response.success) {
        message.success("Profile updated successfully");
        setProfile(response.data);
        setIsModalOpen(false);
        setAvatarFile(null);
      } else {
        message.error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update failed:", error);

      // Handle validation errors
      if (error.response && error.response.data && error.response.data.errors) {
        const errorData = error.response.data;
        message.error(errorData.message || "Validation failed");

        const formErrors = errorData.errors.map(err => ({
          name: err.field,
          errors: [err.message]
        }));
        form.setFields(formErrors);
      } else {
        message.error("Failed to update profile");
      }
    } finally {
      setUpdateLoading(false); // Stop update loading
    }
  };

  return (
    <section className="account-page-wrapper">
      <div className="account-container">

        <Row gutter={40}>

          <Col xs={24} lg={6}>

            <div style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
              <AccountSidebar />
            </div>
          </Col>

          <Col xs={24} lg={18}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: 50 }}>Loading profile...</div>
            ) : (
              <div className="client-profile-card">

                <div className="client-profile-header">
                  <div className="client-cover-photo">
                    <img
                      src="https://i.pinimg.com/1200x/ae/f6/17/aef6170679bdead47b720fd69615d286.jpg"
                      alt="Cover"
                    />
                  </div>
                  <div className="client-avatar-section">
                    <div className="client-avatar-box">
                      <Image
                        src={profile?.avatarUrl || "https://placehold.co/150x150"}
                        alt="Avatar"
                        className="client-avatar-img"
                        preview={{
                          mask: <div style={{ fontSize: 14 }}>View</div>,
                        }}
                      />
                    </div>
                    <h2 className="client-username">{profile?.fullName || "User"}</h2>
                    <p className="client-user-role">Member since {dayjs().format('YYYY')}</p>
                  </div>

                  <button className="btn-edit-absolute" onClick={handleEditClick}>
                    <EditOutlined /> Edit Profile
                  </button>
                </div>

                {/* Details Info Grid */}
                <div className="client-profile-body">
                  <div className="client-info-grid">
                    <div className="info-item">
                      <span className="info-label">Full Name</span>
                      <span className="info-value">{profile?.fullName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email</span>
                      <span className="info-value">{profile?.email}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Phone Number</span>
                      <span className="info-value">{profile?.phone || "Not set"}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Date of Birth</span>
                      <span className="info-value">{profile?.dateOfBirth ? dayjs(profile.dateOfBirth).format('DD/MM/YYYY') : "Not set"}</span>
                    </div>
                    <div className="info-item full-width">
                      <span className="info-label">Address</span>
                      <span className="info-value">{profile?.address || "Not set"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Row>

        <Modal
          title={<div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Update Profile</div>}
          open={isModalOpen}
          onOk={handleUpdate}
          onCancel={() => setIsModalOpen(false)}
          okText="Save Changes"
          destroyOnClose
          maskClosable={false}
          width={600}
          className="custom-modal-profile"
          centered
        >
          {updateLoading && <Loading fullscreen tip="Updating your profile..." />}

          <Form form={form} layout="vertical" className="modal-form">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
                  <Input size="large" prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} placeholder="Enter full name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="phone" label="Phone Number" >
                  <Input size="large" prefix={<PhoneOutlined style={{ color: '#bfbfbf' }} />} placeholder="Enter phone number" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item name="dateOfBirth" label="Date of Birth">
                  <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" size="large" placeholder="Select date of birth" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item name="address" label="Address">
                  <AddressAutocomplete placeholder="Enter your address..." />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Profile Avatar">
                  <div className="avatar-upload-container">
                    <Upload
                      beforeUpload={(file) => {
                        setAvatarFile(file);
                        return false;
                      }}
                      onRemove={() => setAvatarFile(null)}
                      maxCount={1}
                      accept="image/*"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={{ showPreviewIcon: false }}
                    >
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                    <div style={{ fontSize: '13px', color: '#888', marginTop: '8px' }}>
                      Allowed formats: JPG, PNG. Max size: 2MB.
                    </div>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>

      </div>
    </section>
  );
};

export default AccountDetailsPage;