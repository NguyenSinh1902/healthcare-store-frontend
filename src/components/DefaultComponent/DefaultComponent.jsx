import React from 'react';
import Header from '../Header/Header';
// 1. Import component Footer (Giả sử nằm cùng cấp hoặc đúng đường dẫn)
import Footer from '../Footer/Footer'; 

const DefaultComponent = ({ children }) => {
  return (
    <>
      <Header />
            
      <main>
        {children}
      </main>
      
      <Footer />
    </>
  );
};

export default DefaultComponent;