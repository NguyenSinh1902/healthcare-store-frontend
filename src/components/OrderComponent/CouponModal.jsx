import React, { useEffect, useState } from 'react';
import { Modal, message } from 'antd';
import { SearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { getAllCoupons, getCouponByCode } from '../../services/couponService';
import './CouponModal.css';

const CouponModal = ({ open, onCancel, onApply, cartTotal = 0 }) => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCode, setSearchCode] = useState('');

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (open) {
      fetchCoupons();
    }
  }, [open]);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const response = await getAllCoupons();
      if (response && Array.isArray(response)) {
        setCoupons(response);
      } else {
        setCoupons([]);
      }
    } catch (error) {
      console.error("Failed to fetch coupons", error);
      messageApi.error("Failed to load coupons");
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchCode.trim()) {
      messageApi.warning("Please enter a coupon code to search.");
      fetchCoupons();
      return;
    }

    setLoading(true);
    try {
      const response = await getCouponByCode(searchCode);
      if (response) {
        setCoupons([response]);
        messageApi.success("Coupon found!");
      } else {
        messageApi.error("Coupon code not found");
        setCoupons([]);
      }
    } catch (error) {
      console.error("Failed to search coupon", error);
      messageApi.error("Invalid coupon code");
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (coupon) => {
    // Validate Active
    if (coupon.active === false || coupon.status === 'INACTIVE') {
      messageApi.error("This discount code is currently locked!");
      return;
    }

    // Validate Date
    if (coupon.endDate) {
      const now = new Date();
      const endDate = new Date(coupon.endDate);
      endDate.setHours(23, 59, 59, 999);

      if (now > endDate) {
        messageApi.error("This discount code has expired!");
        return;
      }
    }

    const currentTotal = Number(cartTotal);
    const minOrder = Number(coupon.minOrderValue);

    if (currentTotal < minOrder) {

      const formattedMinOrder = minOrder.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      messageApi.error(`Minimum order required ${formattedMinOrder} To use this code!`);
      return;
    }

    messageApi.success("Discount code applied successfully!");
    onApply(coupon);
    onCancel();
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      className="coupon-modal-wrapper"
      centered
    >
      {contextHolder}

      <div className="coupon-container">

        <div className="coupon-header">
          <div className="header-top">
            <h2 className="coupon-title">Your Coupons & Offers</h2>
            <div className="support-link">
              <div className="support-icon"><QuestionCircleOutlined /></div>
              <span>support</span>
            </div>
          </div>

          <div className="divider-line"></div>

          <div className="search-bar-container">
            <div className="search-input-box">
              <input
                type="text"
                placeholder="Enter your discount code"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
              />
            </div>
            <button className="search-btn" onClick={handleSearch} disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        <div className="coupon-list">
          {coupons.map((coupon) => {

            const isInactive = coupon.active === false || coupon.status === 'INACTIVE';
            let isExpired = false;
            if (coupon.endDate) {
              const now = new Date();
              const endDate = new Date(coupon.endDate);
              endDate.setHours(23, 59, 59, 999);
              if (now > endDate) isExpired = true;
            }

            const isInvalid = isInactive || isExpired;

            return (
              <div key={coupon.idCoupon} className={`coupon-card ${isInvalid ? 'coupon-invalid' : ''}`}>

                <div className="card-top">
                  <div className="card-top-content">
                    <div className="icon-bg-white">
                      <div className="inner-icon" style={{ background: '#E5672C' }}></div>
                    </div>
                    <div className="code-info">
                      <div className="discount-text">Flat ${coupon.discountAmount} OFF</div>
                      <div className="code-text">{coupon.code}</div>
                    </div>
                  </div>

                  <div className="card-meta">
                    <span>Code: {coupon.code}</span>
                    <span>Valid: {coupon.endDate}</span>
                  </div>
                </div>

                <div className="card-bottom">
                  <div className="card-details">
                    <div className="min-order">Minimum order: ${coupon.minOrderValue}</div>
                    <div className="desc">Save ${coupon.discountAmount} instantly on checkout!</div>
                    <div className="terms">*Terms & conditions applicable</div>
                  </div>

                  <button
                    className="btn-apply"
                    onClick={() => !isInvalid && handleApply(coupon)}
                    disabled={isInvalid}
                  >
                    {isInvalid ? (isExpired ? 'Expired' : 'Locked') : 'Apply Code'}
                  </button>
                </div>

              </div>
            );
          })}
          {coupons.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '20px', width: '100%', gridColumn: '1 / -1' }}>
              No coupons found
            </div>
          )}
        </div>

      </div>
    </Modal>
  );
};

export default CouponModal;