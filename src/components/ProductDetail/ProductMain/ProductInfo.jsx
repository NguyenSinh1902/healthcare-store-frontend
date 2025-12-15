import React, { useState } from 'react';
import { HeartOutlined, MinusOutlined, PlusOutlined, SafetyCertificateOutlined, SyncOutlined, TruckOutlined } from '@ant-design/icons';
import { Rate, Divider, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCartItem as addItem, fetchCart } from '../../../redux/slices/cartSlice';
import { addToCart } from '../../../services/cartService'; // Direct service call for Buy Now return value
import './ProductInfo.css';

const ProductInfo = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [messageApi, contextHolder] = message.useMessage();

    // If no product data, return null
    if (!product) return null;

    const handleQuantity = (type) => {
        if (type === 'plus') setQuantity(quantity + 1);
        else if (type === 'minus' && quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            messageApi.warning("Please login to add items to cart");
            setTimeout(() => navigate('/login'), 1000);
            return;
        }

        try {
            const actionResult = await dispatch(addItem({
                idProduct: product.idProduct,
                quantity: quantity
            }));

            if (addItem.fulfilled.match(actionResult)) {
                messageApi.success("Product added to cart successfully.");
            } else if (addItem.rejected.match(actionResult)) {
                messageApi.error(actionResult.payload || "Failed to add to cart");
            }
        } catch (error) {
            console.error("Add to cart error", error);
            messageApi.error("Something went wrong");
        }
    };

    const handleBuyNow = async () => {
        if (!isAuthenticated) {
            messageApi.warning("Please login to buy items");
            setTimeout(() => navigate('/login'), 1000);
            return;
        }

        try {
            // Call API directly to get the response data (idCartItem)
            const response = await addToCart(product.idProduct, quantity);

            if (response && response.success) {
                // Sync Redux Cart State
                dispatch(fetchCart());

                const newItem = response.data; // Assuming data contains the cart item with idCartItem
                if (newItem && newItem.idCartItem) {
                    // Navigate directly to Checkout (Order Page)
                    navigate('/order', { state: { selectedCartItemIds: [newItem.idCartItem] } });
                } else {
                    // Fallback if ID not found, go to cart
                    navigate('/cart');
                }
            } else {
                const rawMsg = response.message || "Failed to add to cart";
                const cleanMsg = rawMsg.replace("Unexpected error: ", "");
                messageApi.error(cleanMsg);
            }
        } catch (error) {
            console.error("Buy Now Error:", error);
            messageApi.error("Something went wrong");
        }
    };

    return (
        <>
            {contextHolder}
            <div className="product-info-wrapper">

                <h1 className="pi-title">{product.nameProduct}</h1>

                <div className="pi-meta">
                    <div className="pi-rating">

                        <Rate disabled defaultValue={4} style={{ color: '#FFAD33', fontSize: 14 }} />
                        <span className="pi-review-count">(150 Reviews)</span>
                    </div>
                    <div className="pi-stock-status">
                        {/* <span>|</span> */}
                        <span className={product.stockQuantity > 0 ? "in-stock" : "out-of-stock"}>{product.stockQuantity > 0 ? `In Stock (${product.stockQuantity})` : 'Out of Stock'}</span>
                    </div>
                </div>

                <div className="pi-price-container" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div className="pi-price" style={{ marginBottom: 0 }}>${Number(product.price).toFixed(2)}</div>
                    {product.oldPrice && product.oldPrice > product.price && (
                        <>
                            <div className="pi-old-price" style={{ textDecoration: 'line-through', color: '#999', fontSize: '16px' }}>
                                ${Number(product.oldPrice).toFixed(2)}
                            </div>
                            {product.discountPercent > 0 && (
                                <div className="pi-discount-badge" style={{
                                    background: '#ffeceb',
                                    color: '#ff4d4f',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    fontWeight: '600'
                                }}>
                                    -{product.discountPercent}%
                                </div>
                            )}
                        </>
                    )}
                </div>

                <p className="pi-description">
                    {product.description}
                </p>

                <div className="pi-brand">
                    Brand: <span className="brand-name">{product.brand}</span>
                </div>

                <Divider style={{ margin: '20px 0', borderColor: 'black' }} />

                <div className="pi-actions">

                    <div className="pi-qty-container">
                        <button className="pi-qty-btn" onClick={() => handleQuantity('minus')}><MinusOutlined /></button>
                        <div className="pi-qty-number">{quantity}</div>
                        <button className="pi-qty-btn plus" onClick={() => handleQuantity('plus')}><PlusOutlined /></button>
                    </div>

                    <button className="btn-add-cart" onClick={handleAddToCart}>Add To Cart</button>

                    <div className="wishlist-box">
                        <HeartOutlined style={{ fontSize: '20px' }} />
                    </div>
                </div>

                <button className="btn-buy-now" onClick={handleBuyNow}>Buy Now</button>

                <div className="policy-box">

                    <div className="policy-item">
                        <div className="policy-icon"><SafetyCertificateOutlined /></div>
                        <div className="policy-content">
                            <div className="policy-title">Authentic Product</div>
                            <div className="policy-sub">Guaranteed original from the official brand</div>
                        </div>
                    </div>

                    <div className="policy-item">
                        <div className="policy-icon"><SyncOutlined /></div>
                        <div className="policy-content">
                            <div className="policy-title">Return Delivery</div>
                            <div className="policy-sub">Free 30 Days Delivery Returns. <a href="#">Details</a></div>
                        </div>
                    </div>

                    <div className="policy-item no-border">
                        <div className="policy-icon"><TruckOutlined /></div>
                        <div className="policy-content">
                            <div className="policy-title">Free Delivery</div>
                            <div className="policy-sub"><a href="#">Enter your postal code for Delivery Availability</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductInfo;