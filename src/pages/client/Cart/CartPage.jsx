import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import StoreLocation from '../../../components/CartComponent/StoreLocation';
import CartItem from '../../../components/CartComponent/CartItem';
import OrderSummary from '../../../components/CartComponent/OrderSummary';
import RecommendedProducts from '../../../components/RecommendedProducts/RecommendedProducts';
import './CartPage.css';

const initialCartItems = [
  { 
    id: 1, 
    name: 'Neuroxil 500 Advanced Nerve Relief', 
    price: 25.5, 
    originalPrice: 99.99, 
    quantity: 1, 
    image: 'https://placehold.co/64x64' 
  },
  { 
    id: 2, 
    name: 'CardioPlus 10 Blood Pressure Control', 
    price: 18.9, 
    originalPrice: 99.99, 
    quantity: 13, 
    image: 'https://placehold.co/64x64' 
  },
  { 
    id: 3, 
    name: 'Flexa 200 Rapid Muscle Recovery', 
    price: 75.8, 
    originalPrice: 99.99, 
    quantity: 2, 
    image: 'https://placehold.co/64x64' 
  },
  { 
    id: 4, 
    name: 'VitaCure 7 Immune Strength Formula', 
    price: 55.6, 
    originalPrice: 99.99, 
    quantity: 35, 
    image: 'https://placehold.co/64x64' 
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleRemoveItem = (id) => {
    const newItems = cartItems.filter(item => item.id !== id);
    setCartItems(newItems);
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const newItems = cartItems.map(item => {
        if (item.id === id) {
            return { ...item, quantity: newQuantity };
        }
        return item;
    });
    setCartItems(newItems);
  };

  return (
    <section className="cart-page">
      <div className="cart-page__outer">
        <div className="cart-page__inner">
          <div className="breadcrumb">
             <span>Home</span> 
             <RightOutlined style={{fontSize: '10px'}}/> 
             <span>Eye health supplements</span> 
             <RightOutlined style={{fontSize: '10px'}}/> 
             <span className="current">Shopping Cart</span>
          </div>

          <Row gutter={40}>
            <Col xs={24} lg={16}>
               <div className="section-spacer">
                   <StoreLocation />
               </div>

               <div className="cart-list-container">
                  <h2 className="cart-section-title">Items Name</h2>
                  <div className="cart-items-wrapper">
                      {cartItems.length > 0 ? (
                          cartItems.map((item) => (
                              <CartItem 
                                 key={item.id} 
                                 item={item} 
                                 onRemove={handleRemoveItem}
                                 onUpdateQuantity={handleUpdateQuantity}
                              />
                          ))
                      ) : (
                          <p className="empty-cart-text">Your cart is empty.</p>
                      )}
                  </div>
               </div>
            </Col>

            <Col xs={24} lg={8}>
               <div className="summary-spacer">
                   <OrderSummary subtotal={subtotal} />
               </div>
            </Col>
          </Row>
        </div>
      </div>

      <RecommendedProducts/>
    </section>
  );
};

export default CartPage;
