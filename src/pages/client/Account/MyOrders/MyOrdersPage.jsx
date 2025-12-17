import React, { useState, useEffect } from "react";
import { Row, Col, message, Button } from "antd";
import AccountSidebar from "../../../../components/AccountSidebar/AccountSidebar";
import { getMyOrders } from "../../../../services/orderService";
import OrderDetailsModal from "./OrderDetailsModal";
import "./MyOrdersPage.css";
import iconLinear from "../../../../assets/images/outline-linear.png";
import iconMoney from "../../../../assets/images/outline-money.png";
import iconReceipt from "../../../../assets/images/outline-receipt.png";

import { createPaymentUrl } from "../../../../services/paymentService";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(null); // Store ID of order being retried

  // Modal State
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Pending", "Confirmed", "Shipping", "Delivered", "Cancelled"];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getMyOrders();
      if (response && response.success) {
        setOrders(response.data);
      } else {
        message.error("Failed to load orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      message.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const handleRetryPayment = async (orderId) => {
    if (loadingOrder) return;
    setLoadingOrder(orderId);
    message.loading("Creating payment URL...", 1);
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
      setLoadingOrder(null);
    }
  };

  const handleViewDetails = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  // Logic lọc
  const getFilteredOrders = () => {
    if (activeTab === "All") return orders;
    return orders.filter(o => o.status === activeTab.toUpperCase());
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING": return "pending";
      case "CONFIRMED": return "confirmed";
      case "SHIPPING": return "shipping";
      case "DELIVERED": return "delivered";
      case "CANCELLED": return "cancelled";
      default: return "";
    }
  };

  const formatStatus = (status) => {
    if (!status) return "";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  // const filteredOrders = getFilteredOrders();
  const filteredOrders = [...getFilteredOrders()].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

  return (
    <section className="account-page-wrapper">
      <div className="account-container">
        <Row gutter={40}>

          <Col xs={24} lg={6}>
            <AccountSidebar />
          </Col>

          <Col xs={24} lg={18}>
            <div className="my-orders-content">

              <div className="orders-header">
                <h2 className="page-title">My Orders</h2>
                <div className="order-tabs">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="orders-list">
                {loading ? (
                  <p>Loading orders...</p>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <div key={order.idOrder} className="order-card">

                      <div className="order-col col-main">
                        <div className="order-name" title={order.orderDetails && order.orderDetails.length > 0 ? order.orderDetails[0].productName : `Order #${order.idOrder}`}>
                          {order.orderDetails && order.orderDetails.length > 0
                            ? order.orderDetails[0].productName + (order.orderDetails.length > 1 ? ` & ${order.orderDetails.length - 1} others` : "")
                            : `Order #${order.idOrder}`}
                        </div>
                        <div className="order-date">#{order.idOrder} • {new Date(order.orderDate).toLocaleString()}</div>
                      </div>

                      <div className="order-col col-price">
                        <img src={iconMoney} alt="" className="col-icon-img" />
                        <div className="col-text">
                          <div className="order-price">${Number(order.finalAmount).toFixed(2)}</div>
                          <div className="order-method">{order.paymentMethod}</div>
                        </div>
                      </div>

                      <div className="order-col col-qty">
                        <img src={iconReceipt} alt="" className="col-icon-img" />
                        <div className="col-text">
                          <div className="order-item-label">Items</div>
                          <div className="order-qty-val">{order.orderDetails ? order.orderDetails.length : 0} items</div>
                        </div>
                      </div>

                      <div className="order-col col-status">
                        <div className={`status-badge ${getStatusClass(order.status)}`}>
                          {formatStatus(order.status)}
                        </div>
                        {order.status === 'PENDING' && order.paymentMethod === 'CARD' && (
                          <Button
                            type="primary"
                            danger
                            size="small"
                            loading={loadingOrder === order.idOrder}
                            onClick={() => handleRetryPayment(order.idOrder)}
                            style={{
                              fontSize: '11px',
                              borderRadius: '6px',
                              border: 'none',
                              boxShadow: '0 2px 5px rgba(255, 77, 79, 0.25)',
                              fontWeight: 600
                            }}
                          >
                            Pay Now
                          </Button>
                        )}
                        <button
                          className="btn-reorder"
                          onClick={() => handleViewDetails(order.idOrder)}
                          title="View Details"
                        >
                          <img
                            src={iconLinear}
                            alt="View Details"
                            className="main-icon-img"
                          />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No orders found.</p>
                )}
              </div>
            </div>
          </Col>
        </Row>

        {/* Modal chi tiết đơn hàng */}
        <OrderDetailsModal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          orderId={selectedOrderId}
        />

      </div>
    </section >
  );
};

export default MyOrdersPage;