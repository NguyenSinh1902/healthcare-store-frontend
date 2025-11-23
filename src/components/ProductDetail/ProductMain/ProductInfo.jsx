import React, { useState } from 'react';
import { HeartOutlined, MinusOutlined, PlusOutlined, SafetyCertificateOutlined, SyncOutlined, TruckOutlined } from '@ant-design/icons';
import { Rate, Divider } from 'antd';
import './ProductInfo.css';

const ProductInfo = () => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantity = (type) => {
        if (type === 'plus') setQuantity(quantity + 1);
        else if (type === 'minus' && quantity > 1) setQuantity(quantity - 1);
    };

    return (
        <div className="product-info-wrapper">

            <h1 className="pi-title">Havic HV G-92 Gamepad</h1>
            
            <div className="pi-meta">
                <div className="pi-rating">

                    <Rate disabled defaultValue={4} style={{ color: '#FFAD33', fontSize: 14 }} />
                    <span className="pi-review-count">(150 Reviews)</span>
                </div>
                <div className="pi-stock-status">
                    <span>|</span>
                    <span className="in-stock">In Stock</span>
                </div>
            </div>

            <div className="pi-price">$192.00</div>

            <p className="pi-description">
                Prices include tax. Shipping and other charges (if applicable) will be shown when ordering.
            </p>

            <div className="pi-brand">
                Brand: <span className="brand-name">Nature Made</span>
            </div>

            <Divider style={{ margin: '20px 0', borderColor: 'black' }} />

            <div className="pi-actions">

                <div className="pi-qty-container">
                    <button className="pi-qty-btn" onClick={() => handleQuantity('minus')}><MinusOutlined /></button>
                    <div className="pi-qty-number">{quantity}</div>
                    <button className="pi-qty-btn plus" onClick={() => handleQuantity('plus')}><PlusOutlined /></button>
                </div>

                <button className="btn-add-cart">Add To Cart</button>

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
    );
};

export default ProductInfo;