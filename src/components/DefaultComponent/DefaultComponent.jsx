import Header from '../Header/Header';

const DefaultComponent = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default DefaultComponent;
