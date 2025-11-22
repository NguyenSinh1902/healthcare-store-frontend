import React, { useRef, useState } from 'react';
import './RecommendedProducts.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ProductCard from '../ProductCard/ProductCard';
import imageProduct01 from '../../assets/images/imageProduct01.png';

const recommendedProducts = [
  { id: 1, name: 'Paracetamol', price: 35.5, originalPrice: 160, discount: '-40%', rating: 88, image: imageProduct01 },
  { id: 2, name: 'Cetirizine', price: 35.5, originalPrice: 160, discount: '-40%', rating: 65, image: imageProduct01 },
  { id: 3, name: 'Diphenhydramine', price: 35.5, originalPrice: 160, discount: '-40%', rating: 88, image: imageProduct01 },
  { id: 4, name: 'Pseudoephedrine', price: 35.5, originalPrice: 160, discount: '-40%', rating: 15, image: imageProduct01 },
  { id: 5, name: 'Paracetamol', price: 35.5, originalPrice: 160, discount: '-40%', rating: 88, image: imageProduct01 },
  { id: 6, name: 'Cetirizine', price: 35.5, originalPrice: 160, discount: '-40%', rating: 65, image: imageProduct01 },
  { id: 7, name: 'Diphenhydramine', price: 35.5, originalPrice: 160, discount: '-40%', rating: 88, image: imageProduct01 },
  { id: 8, name: 'Pseudoephedrine', price: 35.5, originalPrice: 160, discount: '-40%', rating: 15, image: imageProduct01 },
];

const RecommendedProducts = () => {
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
    <section className="recommended-products">
      <div className="recommended__outer">
        <div className="recommended__inner">
          
          <div className="recommended-header">
            <div className="header-content">

                <div className="label-block">
                    <div className="red-rectangle"></div>
                    <span className="label-text">Our Products</span>
                </div>

                <h2 className="section-title">Recommended for You</h2>
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
            className={`recommended-container ${isExpanded ? 'expanded' : ''}`} 
            ref={scrollContainerRef}
          >
            {recommendedProducts.map((product) => (
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

export default RecommendedProducts;