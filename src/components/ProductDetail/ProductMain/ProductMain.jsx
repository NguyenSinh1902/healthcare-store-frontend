import React from 'react';
import { Row, Col } from 'antd';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';

const ProductMain = ({ product }) => {
  const images = product && product.thumbnails && product.thumbnails.length > 0
    ? product.thumbnails
    : ['https://placehold.co/500x600?text=No+Image'];

  return (
    <div className="product-main-wrapper" style={{ marginBottom: '80px' }}>
      <Row gutter={150}>
        <Col xs={24} lg={14} xl={14}>
          <ProductImage images={images} />
        </Col>
        <Col xs={24} lg={10} xl={10}>
          <ProductInfo product={product} />
        </Col>
      </Row>
    </div>
  );
};

export default ProductMain;