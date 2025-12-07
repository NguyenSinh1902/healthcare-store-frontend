import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Checkbox, message } from 'antd'; // 1. Import Checkbox, message
import { RightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductsByGroup } from '../../../services/productService';

// Import các component con
import StoreLocation from '../../../components/CartComponent/StoreLocation';
import CartItem from '../../../components/CartComponent/CartItem';
import OrderSummary from '../../../components/CartComponent/OrderSummary';
import RecommendedProducts from '../../../components/RecommendedProducts/RecommendedProducts';

import { fetchCart, updateCartItemQuantity, removeCartItemAction } from '../../../redux/slices/cartSlice';

import './CartPage.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart state from Redux
  const { items } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);


  const sortedItems = useMemo(() => {
    if (!items || items.length === 0) return [];

    return [...items].sort((a, b) => {
      const aActive = a.active !== false;
      const bActive = b.active !== false;

      if (aActive && !bActive) return -1;

      if (!aActive && bActive) return 1;


      return b.idCartItem - a.idCartItem;
    });
  }, [items]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    } else {
      navigate('/login');
    }

    const fetchRecommended = async () => {
      try {
        const response = await getProductsByGroup('RECOMMENDED');
        if (response && response.success) {
          const mappedData = response.data.map((item) => ({
            id: item.idProduct,
            name: item.nameProduct,
            price: item.price,
            originalPrice: item.oldPrice,
            discount: item.discountPercent ? `-${item.discountPercent}%` : null,
            rating: 5,
            image: item.imageProduct,
          }));
          setRecommendedProducts(mappedData);
        }
      } catch (error) {
        console.error("Failed to fetch recommended products", error);
      }
    };
    fetchRecommended();
  }, [dispatch, isAuthenticated, navigate]);

  const subtotal = useMemo(() => {
    if (!sortedItems.length) return 0;

    return sortedItems.reduce((total, item) => {
      if (selectedRowKeys.includes(item.idCartItem)) {
        return total + (item.unitPrice * item.quantity);
      }
      return total;
    }, 0);
  }, [sortedItems, selectedRowKeys]);

  // 4. Hàm xử lý: Chọn tất cả
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Chỉ chọn những item đang ACTIVE
      const activeIds = sortedItems
        .filter(item => item.active !== false)
        .map(item => item.idCartItem);
      setSelectedRowKeys(activeIds);
    } else {
      // Bỏ chọn hết
      setSelectedRowKeys([]);
    }
  };

  const handleSelectOne = (id, checked) => {
    if (checked) {

      setSelectedRowKeys(prev => [...prev, id]);
    } else {

      setSelectedRowKeys(prev => prev.filter(key => key !== id));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeCartItemAction(id));

    setSelectedRowKeys(prev => prev.filter(key => key !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItemQuantity({ idCartItem: id, quantity: newQuantity }));
  };


  const handleCheckout = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Vui lòng chọn sản phẩm để thanh toán!");
      return;
    }

    navigate('/order', { state: { selectedCartItemIds: selectedRowKeys } });
  };

  const activeItemsCount = sortedItems.filter(item => item.active !== false).length;
  const isAllSelected = activeItemsCount > 0 && selectedRowKeys.length === activeItemsCount;

  if (!isAuthenticated) return null;

  return (
    <section className="cart-page">
      <div className="cart-page__outer">
        <div className="cart-page__inner">


          <div className="breadcrumb">
            <span>Home</span>
            <RightOutlined style={{ fontSize: '10px' }} />
            <span>Eye health supplements</span>
            <RightOutlined style={{ fontSize: '10px' }} />
            <span className="current">Shopping Cart</span>
          </div>

          <Row gutter={40}>

            <Col xs={24} lg={16}>
              <div className="section-spacer">
                <StoreLocation />
              </div>

              <div className="cart-list-container">

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
                  <Checkbox
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    disabled={activeItemsCount === 0}
                    style={{ marginRight: '10px', transform: 'scale(1.2)' }} // Phóng to checkbox xíu cho dễ bấm
                  />
                  <h2 className="cart-section-title" style={{ margin: 0 }}>
                    Select All ({selectedRowKeys.length} / {activeItemsCount} active items)
                  </h2>
                </div>

                <div className="cart-items-wrapper">
                  {sortedItems && sortedItems.length > 0 ? (
                    sortedItems.map((item) => {
                      const isInactive = item.active === false;
                      return (
                        <div key={item.idCartItem} style={{
                          display: 'flex',
                          alignItems: 'center',
                          opacity: isInactive ? 0.6 : 1,
                          backgroundColor: isInactive ? '#f5f5f5' : 'transparent',
                          position: 'relative',
                          padding: '10px 0',
                          borderBottom: '1px solid #f0f0f0'
                        }}>

                          {isInactive && (
                            <div style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              zIndex: 10,
                              pointerEvents: 'none'
                            }}>
                              <span style={{
                                backgroundColor: 'rgba(50, 50, 50, 0.8)',
                                color: '#fff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                whiteSpace: 'nowrap'
                              }}>Out of business</span>
                            </div>
                          )}

                          <Checkbox
                            checked={selectedRowKeys.includes(item.idCartItem)}
                            onChange={(e) => handleSelectOne(item.idCartItem, e.target.checked)}
                            disabled={isInactive}
                            style={{ marginRight: '15px', transform: 'scale(1.2)', zIndex: 2 }}
                          />

                          <div style={{ flex: 1, filter: isInactive ? 'grayscale(100%)' : 'none' }}> {/* REMOVED pointerEvents: 'none' */}
                            <CartItem
                              item={{
                                id: item.idCartItem,
                                name: item.nameProduct,
                                price: item.unitPrice,
                                originalPrice: item.unitPrice,
                                quantity: item.quantity,
                                image: item.imageProduct || 'https://placehold.co/64x64'
                              }}
                              onRemove={handleRemoveItem}
                              onUpdateQuantity={(id, qty) => {
                                if (isInactive) return;
                                handleUpdateQuantity(id, qty);
                              }}
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="empty-cart-text">Your cart is empty.</p>
                  )}
                </div>
              </div>
            </Col>

            <Col xs={24} lg={8}>
              <div className="summary-spacer">

                <OrderSummary subtotal={subtotal} onCheckout={handleCheckout} />

              </div>
            </Col>
          </Row>

        </div>
      </div>

      <RecommendedProducts products={recommendedProducts} />
    </section>
  );
};

export default CartPage;