import React from 'react';
import { Row, Col } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

import OrderSuccessLeft from '../../../components/OrderSuccessComponent/OrderSuccessLeft';
import OrderSuccessRight from '../../../components/OrderSuccessComponent/OrderSuccessRight';

import './OrderSuccessPage.css';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {}; // Lấy order từ state

  return (
    <section className="order-success-page">
      <div className="os-page__outer">
        <div className="os-page__inner">

          <div className="breadcrumb">
            <span>Home</span>
            <RightOutlined style={{ fontSize: '10px' }} />
            <span>Eye health supplements</span>
            <RightOutlined style={{ fontSize: '10px' }} />
            <span className="current">Order Success</span>
          </div>

          <div className="os-content-wrapper">
            <Row gutter={30}>

              <Col xs={24} lg={15}>
                <OrderSuccessLeft />
              </Col>

              <Col xs={24} lg={9}>
                <OrderSuccessRight order={order} />
              </Col>

            </Row>
          </div>

          <div className="os-action-buttons">

            <button
              className="btn-action btn-home"
              onClick={() => navigate('/')}
            >
              Back To Home
            </button>

            <button
              className="btn-action btn-history"
              onClick={() => navigate('/account/orders')}
            >
              View Order History
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OrderSuccessPage;