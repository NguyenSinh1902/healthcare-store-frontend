import React from 'react';
import { CopyOutlined } from '@ant-design/icons';
import './OrderSuccessRight.css';

const OrderSuccessRight = ({ order }) => {
  // Safe defaults in case order is null
  const {
    idOrder = '---',
    deliveryFee = 0,
    discountAmount = 0,
    totalAmount = 0,
    paymentMethod = 'CASH'
  } = order || {};

  // Calculate items total (reverse engineering the final total)
  // total = items + fee - discount  =>  items = total - fee + discount
  const itemsTotal = (totalAmount - deliveryFee + discountAmount);

  return (
    <div className="os-right-container">

      <div className="os-summary-card">
        <h3 className="os-card-title">Order Summary</h3>

        <div className="os-order-number-row">
          <span className="os-label-gray">Order Number</span>
          <div className="os-order-code">
            <CopyOutlined className="copy-icon" />
            <span>#{idOrder}</span>
          </div>
        </div>

        <div className="os-info-rows">
          <div className="os-row">
            <span className="os-label-gray">Delivery fee</span>
            <span className="os-value-black">${deliveryFee}</span>
          </div>
          <div className="os-row">
            <span className="os-label-gray">Coupon</span>
            <span className="os-value-black">-${discountAmount}</span>
          </div>
          <div className="os-row">
            <span className="os-label-gray">Items total</span>
            <span className="os-value-black">${itemsTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="os-divider"></div>

        <div className="os-total-row">
          <span className="os-total-label">Total</span>
          <span className="os-total-value">${totalAmount}</span>
        </div>
      </div>

      <div className="os-payment-card">
        <div className="os-payment-content">
          <h4 className="os-payment-title">Pay With</h4>
          <div className="os-payment-method">

            {paymentMethod === 'CREDIT_CARD' ? (
              <div className="mastercard-icon">
                <div className="circle red"></div>
                <div className="circle orange"></div>
              </div>
            ) : null}

            <span className="os-card-number">
              {paymentMethod === 'CASH' ? 'Cash On Delivery' : paymentMethod}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OrderSuccessRight;