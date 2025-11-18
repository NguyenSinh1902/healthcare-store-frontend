import React from 'react';
import './ProductCard.css';
import { HeartOutlined, EyeOutlined, StarFilled } from '@ant-design/icons'; // Import icon từ Ant Design

const ProductCard = ({ product }) => {
  // Dữ liệu mặc định nếu không có props truyền vào (để test giống Figma)
  const {
    name = 'Paracetamol',
    price = 35.5,
    originalPrice = 160,
    discount = '-40%',
    rating = 88,
    image = 'https://placehold.co/224x176', // Thay bằng ảnh thật của bạn
  } = product || {};

  return (
    <div className="product-card">
      {/* Phần hình ảnh và nhãn giảm giá */}
      <div className="product-image-container">
        <div className="discount-badge">{discount}</div>
        <img src={image} alt={name} className="product-image" />
        
        {/* Các nút hành động (Yêu thích / Xem nhanh) */}
        <div className="action-buttons">
            <button className="action-btn wishlist-btn">
                <HeartOutlined />
            </button>
            <button className="action-btn view-btn">
                <EyeOutlined />
            </button>
        </div>
      </div>

      {/* Phần thông tin sản phẩm */}
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        
        <div className="product-price-row">
          <span className="current-price">${price}</span>
          <span className="original-price">${originalPrice}</span>
        </div>

        <div className="product-rating">
             {/* Hiển thị 5 ngôi sao (giả lập) */}
            <div className="stars">
                {[...Array(5)].map((_, i) => (
                    <StarFilled key={i} className="star-icon" />
                ))}
            </div>
            <span className="rating-count">({rating})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;