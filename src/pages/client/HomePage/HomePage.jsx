import React, { useEffect, useState } from "react";
import Banner from "../../../components/Banner/Banner";
import FlashSales from "../../../components/FlashSales/FlashSales";
import BestSellingProducts from "../../../components/BestSellingProducts/BestSellingProducts";
import RecommendedProducts from "../../../components/RecommendedProducts/RecommendedProducts";
import FeaturedProduct from "../../../components/FeaturedProduct/FeaturedProduct";
import NewArrival from "../../../components/NewArrival/NewArrival";
import AboutUs from "../../../components/AboutUs/AboutUs";
import { getProductsByGroup } from "../../../services/productService";

const HomePage = () => {
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [flashSaleRes, bestSellingRes, recommendedRes] = await Promise.all([
          getProductsByGroup("FLASH_SALE"),
          getProductsByGroup("BEST_SELLING"),
          getProductsByGroup("RECOMMENDED"),
        ]);

        if (flashSaleRes.success) {
          setFlashSaleProducts(mapProductData(flashSaleRes.data));
        }
        if (bestSellingRes.success) {
          setBestSellingProducts(mapProductData(bestSellingRes.data));
        }
        if (recommendedRes.success) {
          setRecommendedProducts(mapProductData(recommendedRes.data));
        }

      } catch (error) {
        console.error("Error fetching homepage products:", error);
      }
    };

    fetchProducts();
  }, []);

  const mapProductData = (data) => {
    return data.map((item) => ({
      id: item.idProduct,
      name: item.nameProduct,
      price: item.price,
      originalPrice: item.oldPrice,
      discount: item.discountPercent ? `-${item.discountPercent}%` : null,
      rating: 5, // API doesn't provide rating yet
      image: item.imageProduct,
    }));
  };

  return (
    <div>
      <Banner />

      <FlashSales products={flashSaleProducts} />

      <BestSellingProducts products={bestSellingProducts} />

      <FeaturedProduct />

      <RecommendedProducts products={recommendedProducts} />

      <NewArrival />

      <AboutUs />
    </div >
  );
};

export default HomePage;
