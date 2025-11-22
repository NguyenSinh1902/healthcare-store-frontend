import React from 'react';
import { EnvironmentFilled, CalendarOutlined, RightOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './StoreLocation.css';

const StoreLocation = () => {
  return (
    <div className="store-location-container">
      <div className="store-icon-wrapper">
        <ShoppingCartOutlined className="store-cart-icon" />
      </div>

      <div className="store-info">
        <h3 className="store-title">Store Location</h3>
        <div className="store-address">
          <EnvironmentFilled className="location-pin-icon" />
          <span>Shopping in HCM City</span>
        </div>
      </div>

      <div className="date-picker-btn">
        <CalendarOutlined className="calendar-icon" />
        <span className="date-text">Wed 123</span>
        <RightOutlined className="arrow-right-icon" />
      </div>
    </div>
  );
};

export default StoreLocation;
