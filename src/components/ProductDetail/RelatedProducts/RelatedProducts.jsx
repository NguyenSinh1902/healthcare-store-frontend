import React, { useRef, useState } from 'react';
import './RelatedProducts.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ProductCard from '../../ProductCard/ProductCard';
import imageProduct01 from '../../../assets/images/imageProduct01.png';

const RelatedProducts = ({ products = [] }) => {
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

  // Map API data to ProductCard props format
  const mappedProducts = products.map(item => ({
    id: item.idProduct,
    name: item.nameProduct,
    price: item.price,
    originalPrice: item.oldPrice,
    discount: item.discountPercent ? `-${item.discountPercent}%` : null,
    rating: 5, // API doesn't provide rating yet
    image: item.imageProduct && item.imageProduct.includes('example.com')
      ? imageProduct01
      : item.imageProduct,
  }));

  if (mappedProducts.length === 0) return null;

  return (
    <section className="related-products">
      <div className="related__outer">
        <div className="related__inner">

          <div className="related-header">
            <div className="header-content">

              <div className="label-block">
                <div className="red-rectangle"></div>
                <span className="label-text">Related Item</span>
              </div>

              <h2 className="section-title">Related Products</h2>
            </div>

            {!isExpanded && (
              <div className="header-nav-arrows">
                <button className="nav-arrow-btn" onClick={() => handleScroll('left')}>
                  <LeftOutlined />
                </button>
                <button className="nav-arrow-btn" onClick={() => handleScroll('right')}>
                  <RightOutlined />
                </button>
              </div>
            )}
          </div>

          <div
            className={`related-container ${isExpanded ? 'expanded' : ''}`}
            ref={scrollContainerRef}
          >
            {mappedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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

export default RelatedProducts;