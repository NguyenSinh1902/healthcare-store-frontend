import React, { useState } from "react";
import { Rate, Progress } from "antd";
import "./ProductTabs.css";

const reviewsData = [
  {
    id: 1,
    name: "NguyenSinh",
    avatar: "https://placehold.co/50x50",
    date: "08/15/2025",
    rating: 4,
    comment: "Great quality and authentic product! Totally worth the price.",
  },
  {
    id: 2,
    name: "Ella Luna",
    avatar: "https://placehold.co/50x50",
    date: "06/25/2025",
    rating: 5,
    comment: "Fast delivery and well-packaged. Highly recommended!",
  },
  {
    id: 3,
    name: "Olivia Sophia",
    avatar: "https://placehold.co/50x50",
    date: "05/17/2025",
    rating: 5,
    comment: "I’ve been using it for a few weeks and already see good results",
  },
  {
    id: 4,
    name: "Grace Claire",
    avatar: "https://placehold.co/50x50",
    date: "12/01/2025",
    rating: 4,
    comment: "The product feels genuine and works as described",
  },
  {
    id: 5,
    name: "Grace Claire",
    avatar: "https://placehold.co/50x50",
    date: "12/01/2025",
    rating: 4,
    comment: "The product feels genuine and works as described",
  },
  {
    id: 6,
    name: "Grace Claire",
    avatar: "https://placehold.co/50x50",
    date: "12/01/2025",
    rating: 4,
    comment: "The product feels genuine and works as described",
  },
  {
    id: 7,
    name: "Grace Claire",
    avatar: "https://placehold.co/50x50",
    date: "12/01/2025",
    rating: 4,
    comment: "The product feels genuine and works as described",
  },
];

const infoData = [
  { label: "Shelf Life", value: "3 years from manufacturing date" },
  { label: "Country of Origin", value: "Vietnam" },
  { label: "Place of Manufacture", value: "Vietnam" },
  {
    label: "Manufacturer",
    value: "DUOC SI TIEN CO., LTD – Hau Giang Cosmetic Manufacturing Branch",
  },
  { label: "Responsible Company", value: "DUOC SI TIEN CO., LTD" },
  { label: "Distributor", value: "DUOC SI TIEN CO., LTD" },
  { label: "Product Registration No", value: "33/22/CBMP-HGi" },
  { label: "Advertising Approval No", value: "02-XNQC-SYT" },
];

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="product-tabs-container">

      <div className="tabs-header">
        <div
          className={`tab-item ${activeTab === "description" ? "active" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </div>
        <div
          className={`tab-item ${activeTab === "information" ? "active" : ""}`}
          onClick={() => setActiveTab("information")}
        >
          Information
        </div>
        <div
          className={`tab-item ${activeTab === "review" ? "active" : ""}`}
          onClick={() => setActiveTab("review")}
        >
          Review
        </div>
      </div>

      <div className="tab-content-body">

        {activeTab === "description" && (
          <div className="tab-description fade-in">
            <p className="desc-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in
              vero sapiente odio, error dolore vero temporibus consequatur,
              nobis veniam odit dignissimos consectetur quae in perferendis
              doloribusdebitis corporis, eaque dicta, repellat amet, illum
              adipisci vel perferendis dolor! Quis vel consequuntur repellat
              distinctio rem. Corrupti ratione alias odio, error dolore
              temporibus consequatur, nobis veniam odit laborum dignissimos
              consectetur quae vero in perferendis provident quis.
            </p>

            <div className="desc-subtitle">Packaging & Delivery</div>

            <p className="desc-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in
              vero perferendis dolor! Quis vel consequuntur repellat distinctio
              rem. Corrupti ratione alias odio, error dolore temporibus
              consequatur, nobis veniam odit laborum dignissimos consectetur
              quae vero in perferendis provident quis.
            </p>
          </div>
        )}

        {activeTab === "information" && (
          <div className="tab-information fade-in">
            {infoData.map((item, index) => (
              <div key={index} className="info-row">
                <span className="info-label">{item.label}: </span>
                <span className="info-value">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "review" && (
          <div className="tab-review fade-in">
            <div className="review-layout">

              <div className="review-summary">
                <h3 className="review-heading">Customer Reviews</h3>
                <p className="review-sub">Average rating: 4.5 (5391)</p>

                <div className="rating-bars">
                  {[
                    { star: 5, percent: 80, count: "5.15K" },
                    { star: 4, percent: 60, count: "4.28K" },
                    { star: 3, percent: 30, count: "3.00k" },
                    { star: 2, percent: 15, count: "2.23K" },
                    { star: 1, percent: 5, count: "1.29K" },
                  ].map((row) => (
                    <div key={row.star} className="bar-row">
                      <span className="star-num">{row.star}</span>
                      <div className="star-icon-box">★</div>{" "}

                      <div className="progress-wrapper">

                        <div className="progress-bg">
                          <div
                            className="progress-fill"
                            style={{ width: `${row.percent}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="review-count-num">{row.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="review-list">
                {reviewsData.map((review) => (
                  <div key={review.id} className="review-card">

                    <div className="review-card-top">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="user-avatar"
                      />

                      <div className="review-info">
                        {" "}

                        <div className="review-header">
                          <span className="user-name">{review.name}</span>
                          <span className="review-date">{review.date}</span>
                        </div>
                        <div className="user-rating">
                          <Rate
                            disabled
                            defaultValue={review.rating}
                            style={{ fontSize: 12, color: "#FFAD33" }}
                          />
                        </div>
                      </div>
                    </div>

                    <p className="user-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
