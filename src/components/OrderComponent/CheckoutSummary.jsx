import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, CloseCircleOutlined, CheckCircleFilled } from "@ant-design/icons";
import "./CheckoutSummary.css";
import CouponModal from './CouponModal';

const CheckoutSummary = () => {
  const navigate = useNavigate();
  
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const itemsTotal = 128.78;
  const deliveryFee = 0;
  
  const discountAmount = appliedCoupon ? 10 : 0; 

  const finalTotal = itemsTotal + deliveryFee - discountAmount;

  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
    setIsCouponModalOpen(false);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handlePlaceOrder = () => {
    navigate('/order-success');
  };

  return (
    <div className="checkout-summary-card">
      <div className="cs-section-top">
        <h3 className="cs-title">Order Summary</h3>

        <div className="cs-row-group">
          <div className="cs-row">
            <span className="cs-label">Delivery fee</span>
            <span className="cs-value">${deliveryFee}</span>
          </div>
          <div className="cs-row">
            <span className="cs-label">Items total</span>
            <span className="cs-value">${itemsTotal}</span>
          </div>

          <div className="cs-row">
            <span 
                className="cs-label" 
                style={appliedCoupon ? {color: '#2859C5'} : {}}
            >
                Discount
            </span>
            <span 
                className="cs-value" 
                style={appliedCoupon ? {color: '#2859C5'} : {}}
            >
                -${discountAmount.toFixed(2)}
            </span> 
          </div>

        </div>
      </div>

      <div className="cs-section-coupon">
        <span className="cs-label-coupon">Coupon</span>
        
        {appliedCoupon ? (
            <div className="applied-coupon-box">
                <div className="applied-left">
                    <CheckCircleFilled style={{color: '#00FF66'}} />
                    <span className="applied-code">{appliedCoupon.code}</span>
                </div>
                <CloseCircleOutlined 
                    className="remove-coupon-icon" 
                    onClick={handleRemoveCoupon} 
                />
            </div>
        ) : (
            <button 
                className="btn-add-coupon"
                onClick={() => setIsCouponModalOpen(true)}
            >
                <PlusOutlined style={{ fontSize: '14px' }} />
                <span>Add Coupon</span>
            </button>
        )}
      </div>

      <div className="cs-section-bottom">
        <div className="cs-total-row">
          <span className="cs-total-label">Total</span>
          <span className="cs-total-value">${finalTotal.toFixed(2)}</span>
        </div>

        <p className="cs-terms">
          By placing this order, you are agreeing to Terms and Conditions.
        </p>

        <button 
            className="btn-place-order"
            onClick={handlePlaceOrder}
        >
            Place Order
        </button>
      </div>

      <CouponModal 
        open={isCouponModalOpen} 
        onCancel={() => setIsCouponModalOpen(false)} 
        onApply={handleApplyCoupon}
      />
    </div>
  );
};

export default CheckoutSummary;