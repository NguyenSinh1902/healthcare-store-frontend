import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Divider, Skeleton, Row, Col } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import Confetti from 'react-confetti';
import dayjs from 'dayjs';
import { getOrderById } from '../../../services/orderService';
import './PaymentPage.css';

const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // 1. Get Params from URL
    const orderId = searchParams.get('orderId');
    const txnRef = searchParams.get('txnRef');
    const paymentDate = searchParams.get('paymentDate');

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const [windowDimension, setWindowDimension] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const detectSize = () => {
        setWindowDimension({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    useEffect(() => {
        window.addEventListener('resize', detectSize);
        return () => window.removeEventListener('resize', detectSize);
    }, []);

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            const response = await getOrderById(orderId);
            if (response && response.success) {
                setOrder(response.data);
            }
        } catch (error) {
            console.error("Error fetching order:", error);
        } finally {
            setLoading(false);
        }
    };

    // Helper to render items
    const renderOrderItems = (items) => {
        if (!items || items.length === 0) return null;
        return items.map((item, index) => (
            <div key={index} style={{ display: 'flex', gap: '15px', marginBottom: '15px', alignItems: 'center' }}>
                <img
                    src={item.imageProduct || 'https://placehold.co/60x60'}
                    alt={item.productName}
                    style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #eee' }}
                />
                <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>{item.productName}</div>
                    <div style={{ color: '#888', fontSize: '12px' }}>Qty: {item.quantity}</div>
                </div>
                <div style={{ fontWeight: '600', fontSize: '14px' }}>
                    ${Number(item.totalPrice || (item.unitPrice * item.quantity)).toFixed(2)}
                </div>
            </div>
        ));
    };

    return (
        <div className="payment-page-container">
            <Confetti
                width={windowDimension.width}
                height={windowDimension.height}
                numberOfPieces={200}
                recycle={false}
                run={true}
            />

            {/* Background Decorations */}
            <div className="bg-shape shape-1"></div>
            <div className="bg-shape shape-2"></div>
            <div className="bg-shape shape-3"></div>
            <div className="bg-shape shape-4"></div>
            <div className="bg-shape shape-5"></div>
            <div className="bg-shape shape-6"></div>

            <div className="payment-card" style={{ maxWidth: '600px' }}>
                <div className="payment-icon-wrapper" style={{ backgroundColor: '#F6FFED' }}>
                    <CheckCircleFilled style={{ fontSize: '40px', color: '#52C41A' }} />
                </div>

                <h1 className="payment-title" style={{ color: '#52C41A' }}>Payment Successful!</h1>

                <p className="payment-desc">
                    Thank you for your purchase.<br />
                    Your payment has been processed successfully.
                </p>

                {loading ? (
                    <Skeleton active paragraph={{ rows: 5 }} />
                ) : order ? (
                    <div style={{ textAlign: 'left', background: '#fff', border: '1px solid #eee', borderRadius: '16px', padding: '20px', marginBottom: '25px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>

                        {/* Transaction Receipt Header */}
                        <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px dashed #ddd' }}>
                            <Row gutter={[16, 12]}>
                                <Col span={12}>
                                    <div style={{ fontSize: '12px', color: '#888' }}>Payment Time</div>
                                    <div style={{ fontWeight: '600', color: '#333' }}>
                                        {paymentDate ? dayjs(paymentDate).format('DD MMM YYYY, HH:mm') : dayjs().format('DD MMM YYYY, HH:mm')}
                                    </div>
                                </Col>
                                <Col span={12} style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '12px', color: '#888' }}>Transaction Ref</div>
                                    <div style={{ fontWeight: '600', color: '#333' }}>{txnRef || 'N/A'}</div>
                                </Col>
                            </Row>
                        </div>

                        {/* Order Details */}
                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{ fontSize: '14px', color: '#555', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Order Details #{order.idOrder}</h4>
                            {/* Items rendering logic - Scrollable Container */}
                            <div className="custom-scroll" style={{ maxHeight: '150px', overflowY: 'auto', paddingRight: '5px' }}>
                                {order.orderDetails ? renderOrderItems(order.orderDetails) : (
                                    <div style={{ color: '#999', fontStyle: 'italic' }}>Items list not available</div>
                                )}
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div style={{ background: '#f9f9f9', padding: '12px', borderRadius: '8px', marginBottom: '15px' }}>
                            <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Shipping to</div>
                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
                                {order.deliveryAddress || 'No address provided'}
                            </div>
                        </div>

                        {/* Total Summary */}
                        <Divider style={{ margin: '15px 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', color: '#333' }}>Total Paid</span>
                            <span style={{ fontWeight: '700', color: '#52C41A', fontSize: '24px' }}>${Number(order.finalAmount || order.totalAmount).toFixed(2)}</span>
                        </div>
                    </div>
                ) : null}

                <div className="payment-actions">
                    <Button
                        type="primary"
                        size="large"
                        className="btn-retry"
                        style={{ backgroundColor: '#52C41A', borderColor: '#52C41A', width: '100%' }}
                        onClick={() => navigate('/account/orders')}
                    >
                        View Order History
                    </Button>

                    <Button
                        size="large"
                        className="btn-home"
                        style={{ width: '100%' }}
                        onClick={() => navigate('/')}
                    >
                        Continue Shopping
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
