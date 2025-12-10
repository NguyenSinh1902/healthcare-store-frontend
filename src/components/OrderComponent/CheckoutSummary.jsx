import React, { useState } from 'react';
import { PlusOutlined, CloseCircleOutlined, CheckCircleFilled } from "@ant-design/icons";
import "./CheckoutSummary.css";
import CouponModal from './CouponModal';

const CheckoutSummary = ({ itemsTotal = 0, selectedCoupon, onApplyCoupon, onRemoveCoupon, onPlaceOrder }) => {
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const deliveryFee = 0;
  const discountAmount = selectedCoupon ? selectedCoupon.discountAmount : 0;
  const finalTotal = Math.max(itemsTotal + deliveryFee - discountAmount, 0);

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
            <span className="cs-value">${itemsTotal.toFixed(2)}</span>
          </div>

          <div className="cs-row">
            <span
              className="cs-label"
              style={selectedCoupon ? { color: '#2859C5' } : {}}
            >
              Discount
            </span>
            <span
              className="cs-value"
              style={selectedCoupon ? { color: '#2859C5' } : {}}
            >
              -${discountAmount.toFixed(2)}
            </span>
          </div>

        </div>
      </div>

      <div className="cs-section-coupon">
        <span className="cs-label-coupon">Coupon</span>

        {selectedCoupon ? (
          <div className="applied-coupon-box">
            <div className="applied-left">
              <CheckCircleFilled style={{ color: '#00FF66' }} />
              <span className="applied-code">{selectedCoupon.code}</span>
            </div>
            <CloseCircleOutlined
              className="remove-coupon-icon"
              onClick={onRemoveCoupon}
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
          onClick={onPlaceOrder}
        >
          Place Order
        </button>
      </div>

      <CouponModal
        open={isCouponModalOpen}
        onCancel={() => setIsCouponModalOpen(false)}
        onApply={onApplyCoupon}
        cartTotal={itemsTotal}
      />
    </div>
  );
};

export default CheckoutSummary;