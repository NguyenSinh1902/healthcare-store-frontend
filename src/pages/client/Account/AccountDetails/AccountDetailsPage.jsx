import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form, Input, DatePicker, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import AccountSidebar from '../../../../components/AccountSidebar/AccountSidebar';
import { getProfile, updateProfile } from '../../../../services/profileService';
import './AccountDetailsPage.css';

const AccountDetailsPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    try {
      const values = await form.validateFields();
      const updateData = {
        ...values,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format('YYYY-MM-DD') : null
      };

      const response = await updateProfile(updateData);
      if (response && response.success) {
        message.success("Profile updated successfully");
        setProfile(response.data);
        setIsModalOpen(false);
      } else {
        message.error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update failed:", error);
      message.error("Failed to update profile");
    }
  };

  const accountInfo = profile ? [
    { label: 'Full Name', value: profile.fullName },
    { label: 'Mobile Number', value: profile.phone },
    { label: 'Email Address', value: profile.email }, // Email usually read-only
    { label: 'Address', value: profile.address },
    { label: 'Date of Birth', value: profile.dateOfBirth },
  ] : [];

  return (
    <section className="account-page-wrapper">
      <div className="account-container">

        <Row gutter={40}>

          <Col xs={24} lg={6}>
            <AccountSidebar />
          </Col>

          <Col xs={24} lg={18}>
            <div className="account-details-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 className="page-title" style={{ margin: 0 }}>Account Details</h2>
                <button className="btn-edit-pink" onClick={handleEditClick}>
                  <div className="icon-edit-wrapper">
                    <EditOutlined />
                  </div>
                  <span>Edit Profile</span>
                </button>
              </div>

              <div className="details-list">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  accountInfo.map((item, index) => (
                    <div key={index} className="detail-card">
                      <div className="detail-info">
                        <span className="detail-label">{item.label}</span>
                        <span className="detail-value">{item.value || 'Not set'}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Col>
        </Row>

        <Modal
          title="Update Profile"
          open={isModalOpen}
          onOk={handleUpdate}
          onCancel={() => setIsModalOpen(false)}
          okText="Save Changes"
        >
          <Form form={form} layout="vertical">
            <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item name="dateOfBirth" label="Date of Birth">
              <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item name="avatarUrl" label="Avatar URL">
              <Input />
            </Form.Item>
          </Form>
        </Modal>

      </div>
    </section>
  );
};

export default AccountDetailsPage;