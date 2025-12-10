import React, { useRef, useState } from 'react';
import './BestSellingProducts.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ProductCard from '../ProductCard/ProductCard';

const BestSellingProducts = ({ products = [] }) => {
  const scrollContainerRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const scrollOptions = {
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      };
      scrollContainerRef.current.scrollBy(scrollOptions);
    }
  };

  const handleViewAll = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="best-selling">
      <div className="best-selling__outer">
        <div className="best-selling__inner">

          <div className="best-selling-header">
            <div className="month-block">
              <div className="red-rectangle"></div>
              <span className="month-text">This Month</span>
            </div>
            <h2 className="section-title">Best Selling Products</h2>
          </div>

          <div className="products-wrapper">

            {!isExpanded && (
              <button className="nav-arrow-btn prev-btn" onClick={() => handleScroll('left')}>
                <LeftOutlined />
              </button>
            )}

            <div
              className={`best-selling-container ${isExpanded ? 'expanded' : ''}`}
              ref={scrollContainerRef}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {!isExpanded && (
              <button className="nav-arrow-btn next-btn" onClick={() => handleScroll('right')}>
                <RightOutlined />
              </button>
            )}

          </div>

          <div className="view-all-container">
            <button className="view-all-btn" onClick={handleViewAll}>
              {isExpanded ? "Hide Products" : "View All Products"}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BestSellingProducts;