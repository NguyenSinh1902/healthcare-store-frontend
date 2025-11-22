import React, { useState } from 'react';
import { 
    ClockCircleOutlined, 
    InfoCircleOutlined, 
    EnvironmentOutlined, 
    CreditCardOutlined,
    IdcardOutlined,
    EditOutlined
} from '@ant-design/icons';
import { Modal, Form, Input, Radio, Button } from 'antd';
import './OrderLeftSection.css';
import OrderItemsList from './OrderItemsList';

const items = [
    { id: 1, name: 'Neuroxil 500 Advanced Nerve Relief', price: 25.5, oldPrice: 99.99, image: 'https://placehold.co/64x64' },
    { id: 2, name: 'CardioPlus 10 Blood Pressure Control', price: 18.9, oldPrice: 99.99, image: 'https://placehold.co/64x64' },
    { id: 3, name: 'Flexa 200 Rapid Muscle Recovery', price: 75.8, oldPrice: 99.99, image: 'https://placehold.co/64x64' },
    { id: 4, name: 'VitaCure 7 Immune Strength Formula', price: 55.6, oldPrice: 99.99, image: 'https://placehold.co/64x64' },
];

const OrderLeftSection = () => {
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState('88 Tran Hung Dao Street, District 5, Ho Chi Minh City, Vietnam');
  const [paymentMethod, setPaymentMethod] = useState('Mastercard **** 3434');
  const [deliveryForm] = Form.useForm();
  const [paymentForm] = Form.useForm();

  const handleDeliveryOk = () => {
    deliveryForm.validateFields().then((values) => {
        setDeliveryInfo(values.address);
        setIsDeliveryModalOpen(false);
    });
  };

  const handlePaymentOk = () => {
    paymentForm.validateFields().then((values) => {
        setPaymentMethod(values.method === 'card' ? 'Mastercard **** 3434' : 'Cash on Delivery');
        setIsPaymentModalOpen(false);
    });
  };

  return (
    <div className="order-left-container">
      <div className="checkout-header-card">
        <div className="ch-left">
            <div className="icon-circle blue">
                <IdcardOutlined style={{ fontSize: '18px', color: 'white' }} />
            </div>
            <span className="ch-title">Checkout</span>
        </div>
        <div className="ch-right">
            <div className="time-icon-box">
                <ClockCircleOutlined style={{ color: '#563428', fontSize: '14px' }} />
            </div>
            <span className="ch-time">Sep 17, 8:00–10:00 AM</span>
        </div>
      </div>

      <div className="info-card">
        <div className="card-header">
            <div className="header-left">
                <span className="card-title">Delivery info</span>
                <InfoCircleOutlined className="info-icon" />
            </div>
            <EditOutlined className="edit-icon" onClick={() => {
                deliveryForm.setFieldsValue({ address: deliveryInfo });
                setIsDeliveryModalOpen(true);
            }} />
        </div>
        <div className="card-content">
            <span className="content-label">Deliver to</span>
            <div className="address-row">
                <div className="icon-box-small">
                    <EnvironmentOutlined style={{ color: '#2859C5', fontSize: '12px' }} />
                </div>
                <span className="address-text">{deliveryInfo}</span>
            </div>
        </div>
      </div>

      <div className="info-card">
        <div className="card-header">
            <div className="header-left">
                <span className="card-title">Payment Method</span>
                <InfoCircleOutlined className="info-icon" />
            </div>
            <EditOutlined className="edit-icon" onClick={() => setIsPaymentModalOpen(true)} />
        </div>
        <div className="card-content">
            <span className="content-label">Pay With</span>
            <div className="payment-row">
                <div className="icon-box-small">
                    <CreditCardOutlined style={{ color: '#2859C5', fontSize: '12px' }} />
                </div>
                <span className="payment-text">{paymentMethod}</span>
            </div>
        </div>
      </div>

      <OrderItemsList />

      <Modal 
        title="Edit Delivery Address" 
        open={isDeliveryModalOpen} 
        onOk={handleDeliveryOk} 
        onCancel={() => setIsDeliveryModalOpen(false)}
        okText="Save"
      >
        <Form form={deliveryForm} layout="vertical">
            <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input your address!' }]}>
                <Input.TextArea rows={3} />
            </Form.Item>
        </Form>
      </Modal>

      <Modal 
        title="Select Payment Method" 
        open={isPaymentModalOpen} 
        onOk={handlePaymentOk} 
        onCancel={() => setIsPaymentModalOpen(false)}
        okText="Save"
      >
        <Form form={paymentForm} layout="vertical" initialValues={{ method: 'card' }}>
            <Form.Item name="method">
                <Radio.Group>
                    <Radio value="card" style={{display: 'block', marginBottom: '10px'}}>Credit Card (Mastercard **** 3434)</Radio>
                    <Radio value="cod" style={{display: 'block'}}>Cash on Delivery (COD)</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderLeftSection;
