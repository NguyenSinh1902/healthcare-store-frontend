import React, { useState, useEffect } from 'react';
import {
  ClockCircleOutlined,
  InfoCircleOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
  IdcardOutlined,
  EditOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { Modal, Form, Input, Radio } from 'antd';
import './OrderLeftSection.css';
import OrderItemsList from './OrderItemsList';
import AddressAutocomplete from '../AddressAutocomplete/AddressAutocomplete';

const OrderLeftSection = ({
  deliveryAddress,
  setDeliveryAddress,
  phoneNumber,
  setPhoneNumber,
  paymentMethod,
  setPaymentMethod,
  hasError,
  items
}) => {
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [deliveryForm] = Form.useForm();
  const [paymentForm] = Form.useForm();

  // Update form values when props change
  useEffect(() => {
    deliveryForm.setFieldsValue({
      address: deliveryAddress,
      phone: phoneNumber
    });
  }, [deliveryAddress, phoneNumber, deliveryForm]);

  useEffect(() => {
    // Map payment method string to radio value
    const methodValue = paymentMethod === 'CASH' ? 'cod' : 'card';
    paymentForm.setFieldsValue({ method: methodValue });
  }, [paymentMethod, paymentForm]);

  const handleDeliveryOk = () => {
    deliveryForm.validateFields().then((values) => {
      setDeliveryAddress(values.address);
      setPhoneNumber(values.phone);
      setIsDeliveryModalOpen(false);
    });
  };

  const handlePaymentOk = () => {
    paymentForm.validateFields().then((values) => {
      setPaymentMethod(values.method === 'card' ? 'CARD' : 'CASH');
      setIsPaymentModalOpen(false);
    });
  };

  const displayPaymentMethod = paymentMethod === 'CASH' ? 'Cash on Delivery (COD)' : 'Credit Card (Mastercard)';

  return (
    <div className="order-left-container">
      {/* --- HEADER --- */}
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

      <div className={`info-card ${hasError ? 'card-error' : ''}`}>
        <div className="card-header">
          <div className="header-left">
            <span className="card-title">Delivery info</span>
            <InfoCircleOutlined className="info-icon" />
          </div>
          <EditOutlined className="edit-icon" onClick={() => {
            setIsDeliveryModalOpen(true);
          }} />
        </div>
        <div className="card-content">
          <span className="content-label">Deliver to</span>
          <div className="address-row">
            <div className="icon-box-small">
              <EnvironmentOutlined style={{ color: '#2859C5', fontSize: '12px' }} />
            </div>

            <span className={`address-text ${!deliveryAddress ? 'text-placeholder' : ''}`}>
              {deliveryAddress || "Please enter the delivery address..."}
            </span>
          </div>

          <div className="address-row" style={{ marginTop: '10px' }}>
            <div className="icon-box-small">
              <PhoneOutlined style={{ color: '#2859C5', fontSize: '12px' }} />
            </div>
            <span className={`address-text ${!phoneNumber ? 'text-placeholder' : ''}`}>
              {phoneNumber || "Please enter the phone number..."}
            </span>
          </div>
        </div>

        {hasError && (
          <div className="error-message">
            * The delivery address and phone number must not be left blank.
          </div>
        )}
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
            <span className="payment-text">{displayPaymentMethod}</span>
          </div>
        </div>
      </div>

      <OrderItemsList items={items} />

      <Modal
        title="Edit Delivery Info"
        open={isDeliveryModalOpen}
        onOk={handleDeliveryOk}
        onCancel={() => setIsDeliveryModalOpen(false)}
        okText="Save"
        forceRender={true}
      >
        <Form form={deliveryForm} layout="vertical">
          <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input your address!' }]}>
            <AddressAutocomplete placeholder="Ex: 12 Nguyen Van Bao, Go Vap..." />
          </Form.Item>
          <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please input your phone number!' }]}>
            <Input size="large" placeholder="Ex: 0987654321" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Select Payment Method"
        open={isPaymentModalOpen}
        onOk={handlePaymentOk}
        onCancel={() => setIsPaymentModalOpen(false)}
        okText="Save"
        forceRender={true}
      >
        <Form form={paymentForm} layout="vertical">
          <Form.Item name="method">
            <Radio.Group>
              <Radio value="card" style={{ display: 'block', marginBottom: '10px' }}>Credit Card (Mastercard)</Radio>
              <Radio value="cod" style={{ display: 'block' }}>Cash on Delivery (COD)</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderLeftSection;