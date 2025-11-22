import React, { useState } from "react";
import { Row, Col, Pagination } from "antd";
import {
  CheckOutlined,
  DownOutlined,
  UpOutlined,
  RightOutlined,
} from "@ant-design/icons";
import FilterSidebar from "../../../components/FilterSidebar/FilterSidebar";
import ProductCard from "../../../components/ProductCard/ProductCard";
import "./Category.css";
import Short from "../../../assets/images/Short.png";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

const CategoryPage = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("featured");

  const currentSortLabel = sortOptions.find(
    (opt) => opt.value === selectedSort
  )?.label;

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  return (
    <section className="category-page">
      <div className="category-page__outer">
        <div className="category-page__inner">
          <div className="breadcrumb">
            <span>Home</span>
            <RightOutlined style={{ fontSize: "10px" }} />
            <span className="current">Eye health supplements</span>
          </div>

          <Row gutter={40}>
            <Col span={6} xs={24} md={6}>
              <FilterSidebar />
            </Col>

            <Col span={18} xs={24} md={18}>
              <div className="category-header-actions">
                <div className="sort-dropdown-container">
                  <div
                    className="sort-button"
                    onClick={() => setIsSortOpen(!isSortOpen)}
                  >
                    <div className="sort-text-group">
                      <img
                        src={Short}
                        alt="Short"
                        style={{ width: "20px", height: "16px" }}
                      />
                      <span className="sort-label-gray">Sort by: </span>
                      <span className="sort-label-black">
                        {currentSortLabel}
                      </span>
                    </div>
                    <div className="sort-icon">
                      {isSortOpen ? (
                        <UpOutlined style={{ fontSize: "10px" }} />
                      ) : (
                        <DownOutlined style={{ fontSize: "10px" }} />
                      )}
                    </div>
                  </div>

                  {isSortOpen && (
                    <div className="sort-menu">
                      {sortOptions.map((option) => (
                        <div
                          key={option.value}
                          className={`sort-item ${
                            selectedSort === option.value ? "active" : ""
                          }`}
                          onClick={() => {
                            setSelectedSort(option.value);
                            setIsSortOpen(false);
                          }}
                        >
                          <span className="sort-item-text">{option.label}</span>
                          {selectedSort === option.value && (
                            <CheckOutlined className="check-icon" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="product-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <div key={item} className="product-item-wrapper">
                    <ProductCard />
                  </div>
                ))}
              </div>

              <div className="pagination-wrapper">
                <Pagination
                  defaultCurrent={1}
                  total={50}
                  pageSize={9}
                  itemRender={itemRender}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
