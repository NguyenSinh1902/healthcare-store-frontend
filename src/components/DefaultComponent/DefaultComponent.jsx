import React from 'react';
import Header from '../Header/Header';
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