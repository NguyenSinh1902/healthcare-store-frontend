import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCardOutlined } from '@ant-design/icons';
import './OrderSummary.css';

// 1. Nhận thêm prop onCheckout từ cha truyền xuống
const OrderSummary = ({ subtotal = 0, onCheckout }) => {
    const navigate = useNavigate();

    const deliveryFee = 0;
    const total = subtotal + deliveryFee;

    // Logic: Nếu tổng tiền = 0 (tức là chưa chọn món nào hoặc giỏ hàng rỗng) -> Disable nút
    const isCartEmpty = total <= 0;

    const freeShipGoal = 150;
    const progressPercent = Math.min((subtotal / freeShipGoal) * 100, 100);

    // 2. Hàm xử lý khi bấm nút
    const handleBtnClick = () => {
        if (onCheckout) {
            // Nếu cha có truyền hàm xử lý xuống thì gọi nó
            onCheckout();
        } else {
            // Fallback: Nếu không có thì tự chuyển (giữ logic cũ cho an toàn)
            navigate('/order');
        }
    };

    return (
        <div className="order-summary-container">
            <div className="summary-card">

                <div className="progress-section">
                    <div className="progress-bar-bg">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                    <div className="progress-text">
                        You got free delivery and saved $3.00 today
                    </div>
                </div>

                <div className="summary-info">
                    <h3 className="summary-title">Order Summary</h3>
                    <div className="summary-row-group">
                        <div className="summary-row">
                            <span className="row-label">Items total</span>
                            {/* Hiển thị tổng tiền của CÁC MÓN ĐÃ CHỌN */}
                            <span className="row-value">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span className="row-label">Delivery fee</span>
                            <span className="row-value strike-through">$0</span>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="summary-total-row">
                        <span className="total-label">Subtotal</span>
                        <span className="total-value">${total.toFixed(2)}</span>
                    </div>
                </div>

                {/* --- 3. Checkout Button --- */}
                <button
                    className={`btn-checkout ${isCartEmpty ? 'disabled' : ''}`}
                    disabled={isCartEmpty}
                    onClick={handleBtnClick} // <--- SỬA Ở ĐÂY: Gọi hàm handleBtnClick thay vì navigate trực tiếp
                >
                    <div className="btn-content">
                        <CreditCardOutlined style={{ fontSize: '20px' }} />
                        <span>Checkout</span>
                    </div>
                    <span className="btn-price">${total.toFixed(2)}</span>
                </button>

            </div>
        </div>
    );
};

export default OrderSummary;