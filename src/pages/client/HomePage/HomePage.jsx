import React from 'react'
import Banner from '../../../components/Banner/Banner';
import FlashSales from '../../../components/FlashSales/FlashSales';
import BestSellingProducts from '../../../components/BestSellingProducts/BestSellingProducts';


const HomePage = () => {
  return (
    <div>
      <Banner />
      <FlashSales />
      
        <BestSellingProducts/>
      
      
    </div>
  )
}

export default HomePage