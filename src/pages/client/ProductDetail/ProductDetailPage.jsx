import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, getProductsByCategory } from "../../../services/productService";
import { RightOutlined } from "@ant-design/icons";
import ProductMain from "../../../components/ProductDetail/ProductMain/ProductMain";
import ProductTabs from "../../../components/ProductDetail/ProductTabs/ProductTabs";
import RelatedProducts from "../../../components/ProductDetail/RelatedProducts/RelatedProducts";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);
        const productRes = await getProductById(id);

        if (productRes && productRes.success) {
          const productData = productRes.data;
          setProduct(productData);

          if (productData.idCategory) {
            const relatedRes = await getProductsByCategory(productData.idCategory);
            if (relatedRes && relatedRes.success) {
              setRelatedProducts(relatedRes.data);
            }
          }
        } else {
          setError("Failed to load product");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndRelated();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="product-detail-page">
      <div className="product-detail__outer">
        <div className="product-detail__inner">
          <div className="breadcrumb">
            <span>Home</span>
            <RightOutlined style={{ fontSize: "10px" }} />
            <span>{product.categoryName || 'Category'}</span>
            <RightOutlined style={{ fontSize: "10px" }} />
            <span className="current">{product.nameProduct}</span>
          </div>

          <ProductMain product={product} />

          <ProductTabs description={product.description} information={product.information} />
        </div>
      </div>

      <RelatedProducts products={relatedProducts} />
    </section>
  );
};

export default ProductDetailPage;
