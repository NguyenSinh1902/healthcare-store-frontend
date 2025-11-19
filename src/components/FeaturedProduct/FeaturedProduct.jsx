import React from 'react';
import './FeaturedProduct.css';
import featuredProduct from '../../assets/images/FeaturedProduct.png';

const FeaturedProduct = () => {
  return (
    <section className="featured-product">
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>
      <div className="bg-blob blob-4"></div>

      <div className="glass-overlay"></div>

      <div className="featured__outer">
        <div className="featured__inner">

          <div className="featured-content">

            <div className="text-section">
                <h4 className="sub-title">Featured Product</h4>
                <h2 className="main-title">
                    Exclusively Distributed By GreenPlus <br />
                    Piles Care Plus medicine
                </h2>
            </div>

            <div className="ingredients-row">
                <div className="ingredient-circle">
                    <span className="percent">15%</span>
                    <span className="name">Curcumin</span>
                </div>
                <div className="ingredient-circle">
                    <span className="percent">40%</span>
                    <span className="name">Diosmin</span>
                </div>
                <div className="ingredient-circle">
                    <span className="percent">20%</span>
                    <span className="name">Aloe Vera</span>
                </div>
                <div className="ingredient-circle">
                    <span className="percent">25%</span>
                    <span className="name">Witch Hazel</span>
                </div>
            </div>

            <div className="price-action-row">
                <div className="price-tag">25$</div>
                <button className="buy-now-btn">Buy Now</button>
            </div>

          </div>

          <div className="featured-image-container">
            <div className="image-backdrop"></div> 
            <img src={featuredProduct} alt="Piles Care Plus" className="product-hero-image" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;