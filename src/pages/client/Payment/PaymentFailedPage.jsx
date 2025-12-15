import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Result, message } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { createPaymentUrl } from '../../../services/paymentService';
import './PaymentPage.css';

const PaymentFailedPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const orderId = searchParams.get('orderId');
    const [loading, setLoading] = useState(false);

    const handleRetryPayment = async () => {
        if (!orderId) {
            message.error("Order ID not found");
            return;
        }
        setLoading(true);
        try {
            const res = await createPaymentUrl(orderId, 'NCB');
            if (res && res.success && res.data && res.data.paymentUrl) {
                window.location.href = res.data.paymentUrl;
            } else {
                message.error("Failed to create payment URL");
            }
        } catch (error) {
            console.error(error);
            message.error("Error creating payment URL");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-page-container">
            {/* Background Decorations */}
            <div className="bg-shape shape-1"></div>
            <div className="bg-shape shape-2"></div>
            <div className="bg-shape shape-3"></div>
            <div className="bg-shape shape-4"></div>
            <div className="bg-shape shape-5"></div>
            <div className="bg-shape shape-6"></div>

            <div className="payment-card">
                <div className="payment-icon-wrapper">
                    <CloseCircleFilled style={{ fontSize: '40px', color: '#FF4D4F' }} />
                </div>

                <h1 className="payment-title">Payment Failed!</h1>

                <p className="payment-desc">
                    Oops! Payment for <b>Order #{orderId || 'Unknown'}</b> could not be processed.
                    <br />Please try again or select another payment method.
                </p>

                <div className="payment-actions">
                    <Button
                        type="primary"
                        danger
                        size="large"
                        className="btn-retry"
                        loading={loading}
                        onClick={handleRetryPayment}
                    >
                        Try Payment Again
                    </Button>

                    <Button
                        size="large"
                        className="btn-home"
                        onClick={() => navigate('/')}
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailedPage;
