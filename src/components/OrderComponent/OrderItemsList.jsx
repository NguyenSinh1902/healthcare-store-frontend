import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import './OrderItemsList.css';

const OrderItemsList = ({ items }) => {
    return (
        <div className="items-list-section">
            <h3 className="items-title">Items Name</h3>

            <div className="items-container">

                {items && items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.idCartItem} className="checkout-item">

                            <div className="ci-image">
                                <img src={item.imageProduct || 'https://placehold.co/64x64'} alt={item.nameProduct} />
                            </div>

                            <div className="ci-info">
                                <div className="ci-name">{item.nameProduct}</div>
                                <div className="ci-price-row">
                                    <span className="price-blue">${item.unitPrice}</span>
                                </div>
                            </div>

                            <div className="ci-qty-badge">
                                <span className="qty-label">Qty</span>
                                <CloseOutlined style={{ fontSize: '10px', margin: '0 4px' }} />
                                <span className="qty-value">{item.quantity}</span>
                            </div>

                            <div className="ci-final-price">${(item.unitPrice * item.quantity).toFixed(2)}</div>
                        </div>
                    ))
                ) : (
                    <p>No items selected.</p>
                )}
            </div>
        </div>
    );
};

export default OrderItemsList;