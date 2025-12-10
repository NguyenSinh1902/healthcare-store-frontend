import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, message } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'; // 1. Import useLocation

import OrderLeftSection from '../../../components/OrderComponent/OrderLeftSection';
import CheckoutSummary from '../../../components/OrderComponent/CheckoutSummary';
import { createOrder } from '../../../services/orderService';
import { getProfile } from '../../../services/profileService';
import { fetchCart, clearCartAction } from '../../../redux/slices/cartSlice';

import './OrderPage.css';

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // 2. Hook lấy state từ navigate

  // Lấy toàn bộ giỏ hàng từ Redux
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [addressError, setAddressError] = useState(false);

  // 3. Lấy danh sách ID đã chọn từ CartPage gửi sang
  // Nếu không có (ví dụ user truy cập trực tiếp link), mặc định là mảng rỗng
  const selectedCartItemIds = location.state?.selectedCartItemIds || [];

  useEffect(() => {
    dispatch(fetchCart());
    fetchUserProfile();

    // Nếu vào trang này mà chưa chọn sản phẩm nào -> Đá về giỏ hàng
    if (!location.state?.selectedCartItemIds || location.state.selectedCartItemIds.length === 0) {
      message.warning("Vui lòng chọn sản phẩm từ giỏ hàng trước!");
      navigate('/cart');
    }
  }, [dispatch, navigate, location.state]);

  // 4. Lọc ra danh sách item cần thanh toán (Chỉ những item có ID trong list đã chọn)
  const checkoutItems = useMemo(() => {
    if (!items) return [];
    return items.filter(item => selectedCartItemIds.includes(item.idCartItem));
  }, [items, selectedCartItemIds]);

  // 5. Tính lại tổng tiền dựa trên danh sách đã lọc
  const checkoutTotal = useMemo(() => {
    return checkoutItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  }, [checkoutItems]);


  const fetchUserProfile = async () => {
    try {
      const response = await getProfile();
      if (response && response.success && response.data && response.data.address) {
        setDeliveryAddress(response.data.address);
      } else if (user && user.address) {
        setDeliveryAddress(user.address);
      }
    } catch (error) {
      console.error("Failed to fetch profile for order", error);
      if (user && user.address) {
        setDeliveryAddress(user.address);
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
    if (!deliveryAddress || deliveryAddress.trim() === '') {
      setAddressError(true);
      message.error("Vui lòng nhập địa chỉ giao hàng trước khi đặt đơn!");
      return;
    }

    const orderData = {
      deliveryAddress: deliveryAddress.trim(),
      paymentMethod: paymentMethod,
      idCoupon: selectedCoupon ? selectedCoupon.idCoupon : null,
      selectedCartItemIds: selectedCartItemIds // 6. Gửi danh sách ID xuống Backend
    };

    try {
      const response = await createOrder(orderData);
      if (response && response.success) {
        message.success("Đặt hàng thành công!");
        // Lưu ý: clearCartAction của Redux thường xóa hết. 
        // Nếu muốn chuẩn, bạn nên dispatch 1 action mới là removeSelectedItems(ids)
        // Nhưng tạm thời fetchCart lại để đồng bộ với BE là an toàn nhất.
        dispatch(fetchCart());
        navigate('/order-success');
      } else {
        message.error(response.message || "Đặt hàng thất bại.");
      }
    } catch (error) {
      console.error("Order placement failed", error);
      message.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <section className="order-page">
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
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                hasError={addressError}
                items={checkoutItems} // 7. Truyền danh sách đã lọc xuống để hiển thị
              />
            </Col>

            <Col xs={24} lg={8}>
              <div className="summary-sticky">
                <CheckoutSummary
                  itemsTotal={checkoutTotal} // 8. Truyền tổng tiền đã tính lại
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