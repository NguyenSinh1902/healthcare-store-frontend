import React from "react";
import { RightOutlined } from "@ant-design/icons";
import ProductMain from "../../../components/ProductDetail/ProductMain/ProductMain";
import ProductTabs from "../../../components/ProductDetail/ProductTabs/ProductTabs";
import RelatedProducts from "../../../components/ProductDetail/RelatedProducts/RelatedProducts";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  return (
    <section className="product-detail-page">
      <div className="product-detail__outer">
        <div className="product-detail__inner">
          <div className="breadcrumb">
            <span>Home</span>
            <RightOutlined style={{ fontSize: "10px" }} />
            <span>Eye health supplements</span>
            <RightOutlined style={{ fontSize: "10px" }} />
            <span className="current">Havic HV G-92 Gamepad</span>
          </div>

          <ProductMain />

          <ProductTabs />
        </div>
      </div>

      <RelatedProducts />
    </section>
  );
};

export default ProductDetailPage;
