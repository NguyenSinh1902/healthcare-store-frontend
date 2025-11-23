import React from 'react';
import { Row, Col } from 'antd';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';

const ProductMain = () => {
  return (
    <div className="product-main-wrapper" style={{ marginBottom: '80px' }}>
      <Row gutter={150}>

        <Col xs={24} lg={14} xl={14}>
           <ProductImage />
        </Col>

        <Col xs={24} lg={10} xl={10}>
           <ProductInfo />
        </Col>
        
      </Row>
    </div>
  );
};

export default ProductMain;