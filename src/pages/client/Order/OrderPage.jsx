import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, message } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import OrderLeftSection from '../../../components/OrderComponent/OrderLeftSection';
import CheckoutSummary from '../../../components/OrderComponent/CheckoutSummary';
import { createOrder } from '../../../services/orderService';
import { createPaymentUrl } from '../../../services/paymentService';
import { getProfile } from '../../../services/profileService';
import { fetchCart, clearCartAction } from '../../../redux/slices/cartSlice';

import './OrderPage.css';

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();

  const { items, totalAmount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [addressError, setAddressError] = useState(false);

  const selectedCartItemIds = location.state?.selectedCartItemIds || [];

  useEffect(() => {
    dispatch(fetchCart());
    fetchUserProfile();

    if (!location.state?.selectedCartItemIds || location.state.selectedCartItemIds.length === 0) {
      messageApi.warning("Please select products from your shopping cart first!");
      navigate('/cart');
    }
  }, [dispatch, navigate, location.state]);

  const checkoutItems = useMemo(() => {
    if (!items) return [];
    return items.filter(item => selectedCartItemIds.includes(item.idCartItem));
  }, [items, selectedCartItemIds]);

  const checkoutTotal = useMemo(() => {
    return checkoutItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  }, [checkoutItems]);


  const fetchUserProfile = async () => {
    try {
      const response = await getProfile();
      if (response && response.success && response.data) {
        if (response.data.address) setDeliveryAddress(response.data.address);
        if (response.data.phone) setPhoneNumber(response.data.phone);
      } else if (user) {
        if (user.address) setDeliveryAddress(user.address);
        if (user.phone) setPhoneNumber(user.phone);
      }
    } catch (error) {
      console.error("Failed to fetch profile for order", error);
      if (user) {
        if (user.address) setDeliveryAddress(user.address);
        if (user.phone) setPhoneNumber(user.phone);
      }
    }
  };

  const handleAddressChange = (value) => {
    setDeliveryAddress(value);
    if (value && value.trim() !== '') {
      setAddressError(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!deliveryAddress || deliveryAddress.trim() === '' || !phoneNumber || phoneNumber.trim() === '') {
      setAddressError(true);
      messageApi.error("Please enter your shipping address and phone number!");
      return;
    }

    const orderData = {
      deliveryAddress: deliveryAddress.trim(),
      phoneNumber: phoneNumber.trim(),
      paymentMethod: paymentMethod,
      idCoupon: selectedCoupon ? selectedCoupon.idCoupon : null,
      selectedCartItemIds: selectedCartItemIds
    };

    try {
      const response = await createOrder(orderData);

      if (response && response.success) {

        dispatch(fetchCart());

        const newOrder = response.data;
        const newOrderId = newOrder.idOrder;

        if (paymentMethod === 'CARD') {
          messageApi.loading("Redirecting to the checkout page...", 2.5);

          try {
            const payRes = await createPaymentUrl(newOrderId, 'NCB');
            if (payRes && payRes.success && payRes.data && payRes.data.paymentUrl) {
              window.location.href = payRes.data.paymentUrl;
            } else {
              messageApi.error("Payment link not retrieved. Please try again later.");
              navigate('/account/orders');
            }
          } catch (payErr) {
            console.error("Payment URL creation failed", payErr);
            messageApi.error("Payment initiation error.");
          }

        } else {
          messageApi.success("Order placed successfully!");
          setTimeout(() => {
            navigate('/order-success', { state: { order: newOrder } });
          }, 1000);
        }
      } else {
        messageApi.error(response.message || "Order failed.");
      }
    } catch (error) {
      console.error("Order placement failed", error);
      messageApi.error("An error occurred, please try again!");
    }
  };

  return (
    <section className="order-page">
      {contextHolder}
      <div className="order__outer">
        <div className="order__inner">

          <div className="breadcrumb">
            <span>Home</span>
            <RightOutlined style={{ fontSize: '10px' }} />
            <span>Checkout</span>
          </div>

          <Row gutter={30}>

            <Col xs={24} lg={16}>
              <OrderLeftSection
                deliveryAddress={deliveryAddress}
                setDeliveryAddress={handleAddressChange}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                hasError={addressError}
                items={checkoutItems}
              />
            </Col>

            <Col xs={24} lg={8}>
              <div className="summary-sticky">
                <CheckoutSummary
                  itemsTotal={checkoutTotal}
                  selectedCoupon={selectedCoupon}
                  onApplyCoupon={setSelectedCoupon}
                  onRemoveCoupon={() => setSelectedCoupon(null)}
                  onPlaceOrder={handlePlaceOrder}
                />
              </div>
            </Col>

          </Row>

        </div>
      </div>
    </section>
  );
};

export default OrderPage;