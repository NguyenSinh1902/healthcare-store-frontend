import React from 'react';
import './FlashSales.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ProductCard from '../ProductCard/ProductCard';
import imageProduct01 from '../../assets/images/imageProduct01.png';

const flashSaleProducts = [
  { id: 1, name: 'Paracetamol', price: 35.5, originalPrice: 160, discount: '-40%', rating: 88, image: imageProduct01 },
  { id: 2, name: 'Cetirizine', price: 35.5, originalPrice: 160, discount: '-40%', rating: 65, image: imageProduct01 },
  { id: 3, name: 'Diphenhydramine', price: 35.5, originalPrice: 160, discount: '-40%', rating: 88, image: imageProduct01 },
  { id: 4, name: 'Pseudoephedrine', price: 35.5, originalPrice: 160, discount: '-40%', rating: 15, image: imageProduct01 },
  { id: 5, name: 'Pseudoephedrine', price: 35.5, originalPrice: 160, discount: '-40%', rating: 15, image: imageProduct01 },
  { id: 6, name: 'Pseudoephedrine', price: 35.5, originalPrice: 160, discount: '-40%', rating: 15, image: imageProduct01 },
  { id: 7, name: 'Pseudoephedrine', price: 35.5, originalPrice: 160, discount: '-40%', rating: 15, image: imageProduct01 },
  { id: 8, name: 'Pseudoephedrine', price: 35.5, originalPrice: 160, discount: '-40%', rating: 15, image: imageProduct01 },
  { id: 9, name: 'Pseudoephedrine', price: 35.5, originalPrice: 160, discount: '-40%', rating: 15, image: imageProduct01 },
];

const FlashSales = () => {
  return (
    <section className="flash-sales">
      <div className="flash-sales__outer">
        <div className="flash-sales__inner">
          <div className="flash-sales-header">
            <div className="header-left-group">
              <div className="today-block">
                <div className="red-rectangle"></div>
                <span className="today-text">Today’s</span>
              </div>

              <div className="title-countdown-row">
                <h2 className="section-title">Flash Sales</h2>

                <div className="countdown-timer">
                  <div className="countdown-item">
                    <span className="countdown-label">Days</span>
                    <span className="countdown-number">03</span>
                  </div>
                  <span className="colon">:</span>
                  <div className="countdown-item">
                    <span className="countdown-label">Hours</span>
                    <span className="countdown-number">23</span>
                  </div>
                  <span className="colon">:</span>
                  <div className="countdown-item">
                    <span className="countdown-label">Minutes</span>
                    <span className="countdown-number">19</span>
                  </div>
                  <span className="colon">:</span>
                  <div className="countdown-item">
                    <span className="countdown-label">Seconds</span>
                    <span className="countdown-number">56</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="header-nav-arrows">
              <button className="nav-arrow-btn"><LeftOutlined /></button>
              <button className="nav-arrow-btn"><RightOutlined /></button>
            </div>
          </div>

          <div className="flash-sales-container">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="view-all-container">
            <button className="view-all-btn">View All Products</button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FlashSales;
