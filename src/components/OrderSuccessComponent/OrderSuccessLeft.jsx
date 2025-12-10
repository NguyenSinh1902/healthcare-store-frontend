import React from 'react';
import { CheckOutlined } from '@ant-design/icons';
import './OrderSuccessLeft.css';

import bgFireworks from '../../assets/images/order-success-bg.png';
import iconSuccess from '../../assets/images/success-icon.png';

const PLACEHOLDER_BG = "https://placehold.co/690x223/FFF0F5/B6349A?text=Fireworks+Background";
const PLACEHOLDER_ICON = "https://placehold.co/120x120/B6349A/FFFFFF?text=✓";

const OrderSuccessLeft = ({ order }) => {

  const bgImage = bgFireworks || PLACEHOLDER_BG;
  const checkIcon = iconSuccess || PLACEHOLDER_ICON;

  // Use order date or current date
  const orderDate = order?.createdDate ? new Date(order.createdDate) : new Date();
  const formattedDate = orderDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="os-left-container">

      <div className="os-header">
        <div className="os-header-info">
          <h2 className="os-title">Order In Progress</h2>
          <p className="os-date">{formattedDate}</p>
        </div>
        <div className="os-status-badge">
          In Progress
        </div>
      </div>

      <div className="os-banner">
        <img src={bgImage} alt="Fireworks" className="os-bg-img" />

        <div className="os-banner-content">
          <img src={checkIcon} alt="Success" className="os-icon-img" />
          <h3 className="os-success-text">Order Placed Successfully 🎉</h3>
        </div>
      </div>

      <div className="os-timeline">

        <div className="timeline-bars">
          <div className="bar active"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div className="timeline-steps">

          <div className="step-item">
            <div className="step-icon active">
              <CheckOutlined style={{ fontSize: '10px' }} />
            </div>
            <span className="step-text">Order Placed</span>
          </div>

          <div className="step-item">
            <div className="step-icon"></div>
            <span className="step-text">Processing</span>
          </div>

          <div className="step-item">
            <div className="step-icon"></div>
            <span className="step-text">Delivered</span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default OrderSuccessLeft;