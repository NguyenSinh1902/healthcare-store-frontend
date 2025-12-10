import React, { useState } from 'react';
import { HeartOutlined, MinusOutlined, PlusOutlined, SafetyCertificateOutlined, SyncOutlined, TruckOutlined } from '@ant-design/icons';
import { Rate, Divider, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCartItem as addItem } from '../../../redux/slices/cartSlice';
import './ProductInfo.css';

const ProductInfo = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [messageApi, contextHolder] = message.useMessage();

    // If no product data, return null
    if (!product) return null;

    const handleQuantity = (type) => {
        if (type === 'plus') setQuantity(quantity + 1);
        else if (type === 'minus' && quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            messageApi.warning("Please login to add items to cart");
            navigate('/login');
            return;
        }

        dispatch(addItem({
            idProduct: product.idProduct,
            quantity: quantity
        }));
        messageApi.success("Product added to cart successfully.");
    };

    return (
        <>
            {contextHolder}
            <div className="product-info-wrapper">

                <h1 className="pi-title">{product.nameProduct}</h1>

                <div className="pi-meta">
                    <div className="pi-rating">

                        <Rate disabled defaultValue={4} style={{ color: '#FFAD33', fontSize: 14 }} />
                        <span className="pi-review-count">(150 Reviews)</span>
                    </div>
                    <div className="pi-stock-status">
                        <span>|</span>
                        <span className="in-stock">{product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}</span>
                    </div>
                </div>

                <div className="pi-price">${product.price}</div>

                <p className="pi-description">
                    {product.description}
                </p>

                <div className="pi-brand">
                    Brand: <span className="brand-name">{product.brand}</span>
                </div>

                <Divider style={{ margin: '20px 0', borderColor: 'black' }} />

                <div className="pi-actions">

                    <div className="pi-qty-container">
                        <button className="pi-qty-btn" onClick={() => handleQuantity('minus')}><MinusOutlined /></button>
                        <div className="pi-qty-number">{quantity}</div>
                        <button className="pi-qty-btn plus" onClick={() => handleQuantity('plus')}><PlusOutlined /></button>
                    </div>

                    <button className="btn-add-cart" onClick={handleAddToCart}>Add To Cart</button>

                    <div className="wishlist-box">
                        <HeartOutlined style={{ fontSize: '20px' }} />
                    </div>
                </div>

                <button className="btn-buy-now">Buy Now</button>

                <div className="policy-box">

                    <div className="policy-item">
                        <div className="policy-icon"><SafetyCertificateOutlined /></div>
                        <div className="policy-content">
                            <div className="policy-title">Authentic Product</div>
                            <div className="policy-sub">Guaranteed original from the official brand</div>
                        </div>
                    </div>

                    <div className="policy-item">
                        <div className="policy-icon"><SyncOutlined /></div>
                        <div className="policy-content">
                            <div className="policy-title">Return Delivery</div>
                            <div className="policy-sub">Free 30 Days Delivery Returns. <a href="#">Details</a></div>
                        </div>
                    </div>

                    <div className="policy-item no-border">
                        <div className="policy-icon"><TruckOutlined /></div>
                        <div className="policy-content">
                            <div className="policy-title">Free Delivery</div>
                            <div className="policy-sub"><a href="#">Enter your postal code for Delivery Availability</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductInfo;