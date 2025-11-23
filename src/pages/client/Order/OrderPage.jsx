import React from 'react';
import { Row, Col } from 'antd';
import { RightOutlined } from '@ant-design/icons';

import OrderLeftSection from '../../../components/OrderComponent/OrderLeftSection';
import CheckoutSummary from '../../../components/OrderComponent/CheckoutSummary';

import './OrderPage.css';

const OrderPage = () => {
  return (
    <section className="order-page">
      <div className="order__outer">
        <div className="order__inner">

          <div className="breadcrumb">
             <span>Home</span> 
             <RightOutlined style={{fontSize: '10px'}}/> 
             <span>Eye health supplements</span>
             <RightOutlined style={{fontSize: '10px'}}/> 
             <span className="current">Checkout</span>
          </div>

          <Row gutter={30}>

            <Col xs={24} lg={16}>
               <OrderLeftSection />
            </Col>

            <Col xs={24} lg={8}>
               <div className="summary-sticky">
                   <CheckoutSummary />
               </div>
            </Col>

          </Row>

        </div>
      </div>
    </section>
  );
};

export default OrderPage;