import React, { useState, useEffect } from "react";
import { Row, Col, Pagination } from "antd";
import { useParams } from "react-router-dom";
import {
  CheckOutlined,
  DownOutlined,
  UpOutlined,
  RightOutlined,
} from "@ant-design/icons";
import FilterSidebar from "../../../components/FilterSidebar/FilterSidebar";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { getProductsByCategory, filterProductsByCategory } from "../../../services/productService";
import "./Category.css";
import Short from "../../../assets/images/Short.png";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

const CategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("Category");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("featured");

  const [filterParams, setFilterParams] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (id) {
          let response;
          const currentFilters = { ...filterParams, sort: selectedSort };

          if (currentFilters.sort === 'price_asc') currentFilters.sort = 'price_low_to_high';
          if (currentFilters.sort === 'price_desc') currentFilters.sort = 'price_high_to_low';

          const hasFilters = Object.keys(filterParams).length > 0 || selectedSort !== 'featured';

          if (hasFilters) {
            response = await filterProductsByCategory(id, currentFilters);
          } else {
            response = await getProductsByCategory(id);
          }

          if (response && response.success) {
            setProducts(response.data);
            if (response.data.length > 0) {
              setCategoryName(response.data[0].categoryName || "Category");
            }
          } else {
            setProducts([]);
          }
        }
      } catch (error) {
        console.error("Error fetching products by category:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id, filterParams, selectedSort]);

  const handleFilter = (filters) => {

    const newFilters = {};
    if (filters.minPrice !== undefined) newFilters.minPrice = filters.minPrice;
    if (filters.maxPrice !== undefined) newFilters.maxPrice = filters.maxPrice;
    if (filters.brand) newFilters.brand = filters.brand;

    setFilterParams(newFilters);
    setCurrentPage(1);
  };

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

  const mappedProducts = products.map((item) => ({
    id: item.idProduct,
    name: item.nameProduct,
    price: item.price,
    originalPrice: item.oldPrice,
    discount: item.discountPercent ? `-${item.discountPercent}%` : null,
    rating: 5,
    image: item.imageProduct,
  }));

  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = mappedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="category-page">
      <div className="category-page__outer">
        <div className="category-page__inner">
          <div className="breadcrumb">
            <span>Home</span>
            <RightOutlined style={{ fontSize: "10px" }} />
            <span className="current">{categoryName}</span>
          </div>

          <Row gutter={40}>
            <Col span={6} xs={24} md={6}>
              <FilterSidebar onFilter={handleFilter} />
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
                          className={`sort-item ${selectedSort === option.value ? "active" : ""
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
                {loading ? (
                  <div>Loading...</div>
                ) : currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <div key={product.id} className="product-item-wrapper">
                      <ProductCard product={product} />
                    </div>
                  ))
                ) : (
                  <div>No products found in this category.</div>
                )}
              </div>

              {mappedProducts.length > 0 && (
                <div className="pagination-wrapper">
                  <Pagination
                    current={currentPage}
                    total={mappedProducts.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    itemRender={itemRender}
                    showSizeChanger={false}
                  />
                </div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;