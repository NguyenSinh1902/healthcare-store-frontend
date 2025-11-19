import React from 'react'
import Banner from '../../../components/Banner/Banner';
import FlashSales from '../../../components/FlashSales/FlashSales';
import BestSellingProducts from '../../../components/BestSellingProducts/BestSellingProducts';
import RecommendedProducts from '../../../components/RecommendedProducts/RecommendedProducts'

const HomePage = () => {
  return (
    <div>
      <Banner />
      <FlashSales />
      
        <BestSellingProducts/>
        <RecommendedProducts/>
      
      
    </div>
  )
}

export default HomePage