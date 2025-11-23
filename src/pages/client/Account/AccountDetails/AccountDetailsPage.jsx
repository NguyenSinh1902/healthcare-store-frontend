import React from 'react';
import { Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import AccountSidebar from '../../../../components/AccountSidebar/AccountSidebar';
import './AccountDetailsPage.css';

const accountInfo = [
    { label: 'Full Name', value: 'Nguyen Sinh Le' },
    { label: 'Mobile Number', value: '+84 39889 0029' },
    { label: 'Email Address', value: 'SinhLe1902@gmail.com' },
    { label: 'Address', value: '123 Nguyen Thi Minh Khai Street, District 3, Ho Chi Minh City, Vietnam' },
];

const AccountDetailsPage = () => (
    <section className="account-page-wrapper">
        <div className="account-container">
            <Row gutter={40}>
                <Col xs={24} lg={6}>
                    <AccountSidebar />
                </Col>

                <Col xs={24} lg={18}>
                    <div className="account-details-content">
                        <h2 className="page-title">Account Details</h2>

                        <div className="details-list">
                            {accountInfo.map((item, index) => (
                                <div key={index} className="detail-card">
                                    <div className="detail-info">
                                        <span className="detail-label">{item.label}</span>
                                        <span className="detail-value">{item.value}</span>
                                    </div>

                                    <button className="btn-edit-pink">
                                        <div className="icon-edit-wrapper">
                                            <EditOutlined />
                                        </div>
                                        <span>Edit</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </section>
);

export default AccountDetailsPage;
