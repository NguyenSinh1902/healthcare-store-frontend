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

      </div>
    </div>
  );
};

export default ProductTabs;
