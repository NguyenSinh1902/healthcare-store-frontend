import React, { useState } from "react";
import { Row, Col } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import AccountSidebar from "../../../../components/AccountSidebar/AccountSidebar";
import "./MyOrdersPage.css";
import iconLinear from "../../../../assets/images/outline-linear.png";
import iconMoney from "../../../../assets/images/outline-money.png";
import iconReceipt from "../../../../assets/images/outline-receipt.png";

const orders = [
  {
    id: 1,
    name: "Havic HV G-92 Gamepad",
    date: "Apr 5, 2022, 10:07 AM",
    price: 65.5,
    method: "Paid with cash",
    quantity: 6,
    status: "Completed",
  },
  {
    id: 2,
    name: "CardioPlus 10 Blood Pressure Control",
    date: "Apr 5, 2022, 10:07 AM",
    price: 65.5,
    method: "Paid with cash",
    quantity: 6,
    status: "Completed",
  },
  {
    id: 3,
    name: "Order Delivered",
    date: "Apr 5, 2022, 10:07 AM",
    price: 65.5,
    method: "Paid with cash",
    quantity: 6,
    status: "Completed",
  },
];

const MyOrdersPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "In Progress", "Delivered", "Cancelled"];

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
                {orders.map((order) => (
                  <div key={order.id} className="order-card">

                    <div className="order-col col-main">
                      <div className="order-name">{order.name}</div>
                      <div className="order-date">{order.date}</div>
                    </div>

                    <div className="order-col col-price">
                      <img src={iconMoney} alt="" className="col-icon-img" />
                      <div className="col-text">
                        <div className="order-price">${order.price}</div>
                        <div className="order-method">{order.method}</div>
                      </div>
                    </div>

                    <div className="order-col col-qty">
                      <img src={iconReceipt} alt="" className="col-icon-img" />
                      <div className="col-text">
                        <div className="order-item-label">Item</div>
                        <div className="order-qty-val">{order.quantity}x</div>
                      </div>
                    </div>

                    <div className="order-col col-status">
                      <div className="status-badge">{order.status}</div>
                      <button className="btn-reorder">

                        <img
                          src={iconLinear}
                          alt=""
                          className="main-icon-img"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default MyOrdersPage;
