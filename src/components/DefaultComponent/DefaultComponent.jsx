import React from 'react';
import Header from '../Header/Header';
import Chatbox from '../Chatbox/Chatbox';
import Footer from '../Footer/Footer';

const DefaultComponent = ({ children }) => {
  return (
    <>
      <Header />

      <main>
        {children}
      </main>

      <Chatbox />
      <Footer />
    </>
  );
};

export default DefaultComponent;