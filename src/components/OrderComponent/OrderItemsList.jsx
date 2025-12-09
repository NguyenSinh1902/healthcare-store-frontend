import React from 'react';
// import { useSelector } from 'react-redux'; // <-- Bỏ hoặc comment dòng này
import { CloseOutlined } from '@ant-design/icons';
import './OrderItemsList.css';

// 1. Nhận prop 'items' từ cha (OrderLeftSection)
const OrderItemsList = ({ items }) => {

    // Không lấy từ Redux nữa, dùng biến items được truyền vào
    // const { items } = useSelector((state) => state.cart); 

    return (
        <div className="items-list-section">
            <h3 className="items-title">Items Name</h3>

            <div className="items-container">
                {/* Sử dụng biến items từ props */}
                {items && items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.idCartItem} className="checkout-item">

                            {/* CỘT 1: ẢNH */}
                            <div className="ci-image">
                                <img src={item.imageProduct || 'https://placehold.co/64x64'} alt={item.nameProduct} />
                            </div>

                            {/* CỘT 2: TÊN & ĐƠN GIÁ */}
                            <div className="ci-info">
                                <div className="ci-name">{item.nameProduct}</div>
                                <div className="ci-price-row">
                                    <span className="price-blue">${item.unitPrice}</span>
                                </div>
                            </div>

                            {/* CỘT 3: SỐ LƯỢNG */}
                            <div className="ci-qty-badge">
                                <span className="qty-label">Qty</span>
                                <CloseOutlined style={{ fontSize: '10px', margin: '0 4px' }} />
                                <span className="qty-value">{item.quantity}</span>
                            </div>

                            {/* CỘT 4: TỔNG TIỀN */}
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