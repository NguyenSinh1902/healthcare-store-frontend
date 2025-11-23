import React from 'react';
import { CopyOutlined } from '@ant-design/icons';
import './OrderSuccessRight.css';

const OrderSuccessRight = () => {
  return (
    <div className="os-right-container">

      <div className="os-summary-card">
        <h3 className="os-card-title">Order Summary</h3>

        <div className="os-order-number-row">
            <span className="os-label-gray">Order Number</span>
            <div className="os-order-code">
                <CopyOutlined className="copy-icon" />
                <span>#123-321</span>
            </div>
        </div>

        <div className="os-info-rows">
            <div className="os-row">
                <span className="os-label-gray">Delivery fee</span>
                <span className="os-value-black">$0</span>
            </div>
            <div className="os-row">
                <span className="os-label-gray">Coupon</span>
                <span className="os-value-black">-$5</span>
            </div>
            <div className="os-row">
                <span className="os-label-gray">Items total</span>
                <span className="os-value-black">$128</span>
            </div>
        </div>

        <div className="os-divider"></div>

        <div className="os-total-row">
            <span className="os-total-label">Total</span>
            <span className="os-total-value">$128</span>
        </div>
      </div>

      <div className="os-payment-card">
        <div className="os-payment-content">
            <h4 className="os-payment-title">Pay With</h4>
            <div className="os-payment-method">

                <div className="mastercard-icon">
                    <div className="circle red"></div>
                    <div className="circle orange"></div>
                </div>
                <span className="os-card-number">MasterCard 02132</span>
            </div>
        </div>
      </div>

    </div>
  );
};

export default OrderSuccessRight;