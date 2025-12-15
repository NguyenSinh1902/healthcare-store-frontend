import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCardOutlined } from '@ant-design/icons';
import './OrderSummary.css';

const OrderSummary = ({ subtotal = 0, onCheckout }) => {
    const navigate = useNavigate();

    const deliveryFee = 0;
    const total = subtotal + deliveryFee;

    const isCartEmpty = total <= 0;

    const freeShipGoal = 150;
    const progressPercent = Math.min((subtotal / freeShipGoal) * 100, 100);

    const handleBtnClick = () => {
        if (onCheckout) {
            onCheckout();
        } else {
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

                <button
                    className={`btn-checkout ${isCartEmpty ? 'disabled' : ''}`}
                    disabled={isCartEmpty}
                    onClick={handleBtnClick}
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