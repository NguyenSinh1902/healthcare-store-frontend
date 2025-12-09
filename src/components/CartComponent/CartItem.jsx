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

            {/* Phần Giữa: Bộ đếm số lượng */}
            <div className="cart-item-actions">
                <div className="qty-control">
                    {/* Nút Trừ (Trắng) */}
                    <button
                        className="qty-btn minus"
                        onClick={() => onUpdateQuantity(id, quantity - 1)}
                        disabled={quantity <= 1}
                    >
                        <MinusOutlined style={{ fontSize: '10px' }} />
                    </button>

                    {/* Số lượng */}
                    <span className="qty-value">{String(quantity).padStart(2, '0')}</span>

                    {/* Nút Cộng (Xanh) */}
                    <button
                        className="qty-btn plus"
                        onClick={() => onUpdateQuantity(id, quantity + 1)}
                    >
                        <PlusOutlined style={{ fontSize: '10px', color: 'white' }} />
                    </button>
                </div>

                {/* Nút Xóa */}
                <div className="remove-btn" onClick={() => onRemove(id)}>
                    {/* Dùng icon thùng rác hoặc chữ Remove như thiết kế */}
                    {/* <DeleteOutlined /> */}
                    <span>Remove</span>
                </div>
            </div>

            {/* Phần Phải: Tổng tiền của item này */}
            <div className="cart-item-total">
                ${(price * quantity).toFixed(1)}
            </div>
        </div>
    );
};

export default CartItem;
