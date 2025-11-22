import React from 'react';
import './OrderItemsList.css';

const items = [
    { id: 1, name: 'Neuroxil 500 Advanced Nerve Relief', price: 25.5, oldPrice: 99.99, image: 'https://placehold.co/64x64' },
    { id: 2, name: 'CardioPlus 10 Blood Pressure Control', price: 18.9, oldPrice: 99.99, image: 'https://placehold.co/64x64' },
    { id: 3, name: 'Flexa 200 Rapid Muscle Recovery', price: 75.8, oldPrice: 99.99, image: 'https://placehold.co/64x64' },
    { id: 4, name: 'VitaCure 7 Immune Strength Formula', price: 55.6, oldPrice: 99.99, image: 'https://placehold.co/64x64' },
];

const OrderItemsList = () => {
  return (
    <div className="items-list-section">
        <h3 className="items-title">Items Name</h3>
        
        <div className="items-container">
            {items.map((item) => (
                <div key={item.id} className="checkout-item">

                    <div className="ci-image">
                        <img src={item.image} alt={item.name} />
                    </div>

                    <div className="ci-info">
                        <div className="ci-name">{item.name}</div>
                        <div className="ci-price-row">
                            <span className="price-blue">${item.oldPrice}</span>
                            <span className="price-strike">${item.oldPrice}</span>
                        </div>
                    </div>

                    <div className="ci-final-price">${item.price}</div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default OrderItemsList;