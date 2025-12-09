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

  // 2. State lưu danh sách ID các item được chọn
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Sắp xếp items:
  // 1. Ưu tiên sản phẩm còn kinh doanh (active) lên trên
  // 2. Sau đó mới sắp xếp theo thời gian thêm vào (Mới nhất lên đầu)
  const sortedItems = useMemo(() => {
    if (!items || items.length === 0) return [];

    return [...items].sort((a, b) => {
      const aActive = a.active !== false; // true nếu active hoặc undefined
      const bActive = b.active !== false;

      // Nếu a Active mà b Inactive -> a lên trước (-1)
      if (aActive && !bActive) return -1;

      // Nếu a Inactive mà b Active -> b lên trước (1)
      if (!aActive && bActive) return 1;

      // Nếu trạng thái giống nhau (cùng active hoặc cùng inactive)
      // -> Sắp xếp theo ID giảm dần (Mới nhất lên đầu)
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

  // 3. Logic tính tổng tiền (Chỉ tính những món ĐƯỢC CHỌN)
  // useMemo giúp tự động tính lại khi danh sách chọn hoặc số lượng thay đổi
  const subtotal = useMemo(() => {
    if (!sortedItems.length) return 0;

    return sortedItems.reduce((total, item) => {
      // Nếu ID của item nằm trong danh sách đang chọn -> cộng tiền
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

  // 5. Hàm xử lý: Chọn từng món
  const handleSelectOne = (id, checked) => {
    if (checked) {
      // Thêm ID vào mảng
      setSelectedRowKeys(prev => [...prev, id]);
    } else {
      // Lọc bỏ ID khỏi mảng
      setSelectedRowKeys(prev => prev.filter(key => key !== id));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeCartItemAction(id));
    // Nếu xóa item đang chọn thì cũng phải bỏ nó khỏi list selected
    setSelectedRowKeys(prev => prev.filter(key => key !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItemQuantity({ idCartItem: id, quantity: newQuantity }));
  };

  // 6. Hàm xử lý khi bấm Checkout ở OrderSummary
  // Bạn cần truyền hàm này xuống component OrderSummary (hoặc sửa OrderSummary để gọi hàm này)
  // Hàm xử lý khi bấm Checkout
  const handleCheckout = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Vui lòng chọn sản phẩm để thanh toán!");
      return;
    }
    // Chuyển trang có mang theo State
    navigate('/order', { state: { selectedCartItemIds: selectedRowKeys } });
  };

  // Check xem có đang chọn tất cả (chỉ tính active) không
  const activeItemsCount = sortedItems.filter(item => item.active !== false).length;
  const isAllSelected = activeItemsCount > 0 && selectedRowKeys.length === activeItemsCount;

  if (!isAuthenticated) return null;

  return (
    <section className="cart-page">
      <div className="cart-page__outer">
        <div className="cart-page__inner">

          {/* --- BREADCRUMB --- */}
          <div className="breadcrumb">
            <span>Home</span>
            <RightOutlined style={{ fontSize: '10px' }} />
            <span>Eye health supplements</span>
            <RightOutlined style={{ fontSize: '10px' }} />
            <span className="current">Shopping Cart</span>
          </div>

          <Row gutter={40}>
            {/* === CỘT TRÁI === */}
            <Col xs={24} lg={16}>
              <div className="section-spacer">
                <StoreLocation />
              </div>

              <div className="cart-list-container">
                {/* HEADER CỦA LIST: Thêm Checkbox Select All */}
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
                          // pointerEvents: isInactive ? 'none' : 'auto', <--- REMOVED THIS
                          position: 'relative',
                          padding: '10px 0',
                          borderBottom: '1px solid #f0f0f0'
                        }}>

                          {/* Overlay for inactive items */}
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

                          {/* Checkbox */}
                          <Checkbox
                            checked={selectedRowKeys.includes(item.idCartItem)}
                            onChange={(e) => handleSelectOne(item.idCartItem, e.target.checked)}
                            disabled={isInactive}
                            style={{ marginRight: '15px', transform: 'scale(1.2)', zIndex: 2 }}
                          />

                          {/* CartItem Component */}
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

            {/* === CỘT PHẢI === */}
            <Col xs={24} lg={8}>
              <div className="summary-spacer">
                {/* Truyền subtotal đã tính toán lại theo lựa chọn */}
                <OrderSummary subtotal={subtotal} onCheckout={handleCheckout} />

                {/* Lưu ý: Bạn cần sửa OrderSummary.js để nút Checkout gọi navigate('/order') 
                    nhưng phải kèm theo state hoặc gọi hàm handleCheckout ở trên.
                    Cách đơn giản nhất là sửa OrderSummary nhận prop onCheckout:
                    <OrderSummary subtotal={subtotal} onCheckout={handleCheckout} />
                */}
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