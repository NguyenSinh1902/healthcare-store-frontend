import React from 'react';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
import './CartItem.css';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {

    const { id, name, price, originalPrice, quantity, image } = item;

    return (
        <div className="cart-item-wrapper">
            <div className="cart-item-left">

                <div className="cart-item-image-box">
                    <img src={image} alt={name} />
                </div>

                <div className="cart-item-info">
                    <div className="item-name" title={name}>{name}</div>

                    {item.stockQuantity === 0 && (
                        <div className="out-of-business-badge">Out of business</div>
                    )}

                    <div className="item-price-row">
                        <span className="price-current">${Number(price).toFixed(2)}</span>
                        <span className="price-original">${Number(originalPrice).toFixed(2)}</span>
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
                ${(price * quantity).toFixed(2)}
            </div>
        </div>
    );
};

export default CartItem;
