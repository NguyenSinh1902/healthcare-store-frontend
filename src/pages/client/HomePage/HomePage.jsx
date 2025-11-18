import React from 'react'
import Banner from '../../../components/Banner/Banner';
import ProductCard from '../../../components/ProductCard/ProductCard';
import imageProduct01 from '../../../assets/images/imageProduct01.png';

const HomePage = () => {

  const sampleProduct = {
    name: 'Cool Fever TabsLite Fever Fix (Cooling Powder 180mg)',
    price: 35.5,
    originalPrice: 160,
    discount: '-40%',
    rating: 88,
    image:  imageProduct01
  };

  return (
    <div>
      <Banner />
      <div style={{ display: 'flex', gap: '20px', padding: '10px', justifyContent: 'center' }}>
         <ProductCard product={sampleProduct} />
         <ProductCard product={sampleProduct} />
         <ProductCard product={sampleProduct} />
         <ProductCard product={sampleProduct} />
      </div>
      <div style={{ display: 'flex', gap: '20px', padding: '10px', justifyContent: 'center' }}>
        <h1>acb</h1>
      </div>

    </div>
  )
}

export default HomePage