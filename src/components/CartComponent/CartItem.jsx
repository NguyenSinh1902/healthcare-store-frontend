import React from 'react';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
import './CartItem.css';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
    // Destructuring dữ liệu từ props
    const { id, name, price, originalPrice, quantity, image } = item;

    return (
        <div className="cart-item-wrapper">
            {/* Phần Trái: Ảnh + Thông tin */}
            <div className="cart-item-left">

                {/* Khung ảnh bo góc */}
                <div className="cart-item-image-box">
                    <img src={image} alt={name} />
                </div>

                {/* Thông tin tên + giá */}
                <div className="cart-item-info">
                    <div className="item-name">{name}</div>
                    <div className="item-price-row">
                        <span className="price-current">${price}</span>
                        <span className="price-original">${originalPrice}</span>
                    </div>
                </div>
            </div>

            <div className="cart-item-actions">
                <div className="qty-control">

                    <button
                        className="qty-btn minus"
                        onClick={() => onUpdateQuantity(id, quantity - 1)}
                        disabled={quantity <= 1}
                    >
                        <MinusOutlined style={{ fontSize: '10px' }} />
                    </button>

                    <span className="qty-value">{String(quantity).padStart(2, '0')}</span>

                    <button
                        className="qty-btn plus"
                        onClick={() => onUpdateQuantity(id, quantity + 1)}
                    >
                        <PlusOutlined style={{ fontSize: '10px', color: 'white' }} />
                    </button>
                </div>

                <div className="remove-btn" onClick={() => onRemove(id)}>

                    <span>Remove</span>
                </div>
            </div>

            <div className="cart-item-total">
                ${(price * quantity).toFixed(1)}
            </div>
        </div>
    );
};

export default CartItem;
