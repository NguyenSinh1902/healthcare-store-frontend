import React from "react";
import Banner from "../../../components/Banner/Banner";
import FlashSales from "../../../components/FlashSales/FlashSales";
import BestSellingProducts from "../../../components/BestSellingProducts/BestSellingProducts";
import RecommendedProducts from "../../../components/RecommendedProducts/RecommendedProducts";
import FeaturedProduct from "../../../components/FeaturedProduct/FeaturedProduct";
import NewArrival from "../../../components/NewArrival/NewArrival";
import AboutUs from "../../../components/AboutUs/AboutUs";

const HomePage = () => {
  return (
    <div>
      <Banner />

      <FlashSales />

      <BestSellingProducts />

      <FeaturedProduct />

      <RecommendedProducts />

      <NewArrival />

      <AboutUs />
    </div>
  );
};

export default HomePage;
