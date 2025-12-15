import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form, Input, DatePicker, message, Upload, Button } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import AccountSidebar from '../../../../components/AccountSidebar/AccountSidebar';
import { getProfile, updateProfile } from '../../../../services/profileService';
import Loading from '../../../../components/Loading/Loading';
import AddressAutocomplete from '../../../../components/AddressAutocomplete/AddressAutocomplete';
import './AccountDetailsPage.css';

const AccountDetailsPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false); // Loading for update
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
      message.error("Failed to update profile");
    } finally {
      setUpdateLoading(false); // Stop update loading
    }
  };

  return (
    <section className="account-page-wrapper">
      <div className="account-container">

        <Row gutter={40}>
          {/* CỘT SIDEBAR */}
          <Col xs={24} lg={6}>
            {/* Bọc Sidebar trong một thẻ div và sticky thẻ div này */}
            <div style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
              <AccountSidebar />
            </div>
          </Col>

          <Col xs={24} lg={18}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: 50 }}>Loading profile...</div>
            ) : (
              <div className="client-profile-card">
                {/* Header: Cover + Avatar */}
                <div className="client-profile-header">
                  <div className="client-cover-photo">
                    <img
                      src="https://i.pinimg.com/1200x/ae/f6/17/aef6170679bdead47b720fd69615d286.jpg"
                      alt="Cover"
                    />
                  </div>
                  <div className="client-avatar-section">
                    <div className="client-avatar-box">
                      <img
                        src={profile?.avatarUrl || "https://placehold.co/150x150"}
                        alt="Avatar"
                        className="client-avatar-img"
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
          title="Update Profile"
          open={isModalOpen}
          onOk={handleUpdate}
          onCancel={() => setIsModalOpen(false)}
          okText="Save Changes"
          destroyOnClose
          maskClosable={false}
          width={600}
        >
          {updateLoading && <Loading fullscreen tip="Updating your profile..." />}

          <Form form={form} layout="vertical" className="modal-form">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="phone" label="Phone Number" >
                  <Input size="large" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="dateOfBirth" label="Date of Birth">
                  <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" size="large" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item name="address" label="Address">
                  <AddressAutocomplete placeholder="Enter your address..." />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Avatar">
                  <Upload
                    beforeUpload={(file) => {
                      setAvatarFile(file);
                      return false;
                    }}
                    onRemove={() => setAvatarFile(null)}
                    maxCount={1}
                    accept="image/*"
                    listType="picture"
                  >
                    <Button icon={<UploadOutlined />} size="large">Click to Upload Avatar</Button>
                  </Upload>
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