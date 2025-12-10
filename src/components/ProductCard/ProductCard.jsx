import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { addToCartItem } from '../../redux/slices/cartSlice';
import './ProductCard.css';
import { HeartOutlined, EyeOutlined, StarFilled } from '@ant-design/icons';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();


  const {
    id = 1,
    name = 'Paracetamol',
    price = 35.5,
    originalPrice = 160,
    discount = '-40%',
    rating = 88,
    image = 'https://placehold.co/224x176',
  } = product || {};

  const handleCardClick = () => {
    navigate(`/product-detail/${id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      messageApi.warning("Please login to add items to cart");
      navigate('/login');
      return;
    }

    dispatch(addToCartItem({
      idProduct: id,
      quantity: 1
    }));
    messageApi.success("Product added to cart successfully.");
  };

  return (
    <>
      {contextHolder}
      <div className="product-card" onClick={handleCardClick}>
        <div className="pc-product-image-container">
          <div className="discount-badge">{discount}</div>
          <img src={image} alt={name} className="product-image" />

          <div className="action-buttons">
            <button className="action-btn wishlist-btn" onClick={(e) => e.stopPropagation()}>
              <HeartOutlined />
            </button>
            <button className="action-btn view-btn" onClick={(e) => e.stopPropagation()}>
              <EyeOutlined />
            </button>
          </div>

          <div className="add-to-cart-layer" onClick={handleAddToCart}>
            Add To Cart
          </div>
        </div>

        <div className="product-info">
          <h3 className="product-name">{name}</h3>

          <div className="product-price-row">
            <span className="current-price">${price}</span>
            <span className="original-price">${originalPrice}</span>
          </div>

          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <StarFilled key={i} className="star-icon" />
              ))}
            </div>
            <span className="rating-count">({rating})</span>
          </div>
        </div>
      </div>

    </>
  );
};

export default ProductCard;
