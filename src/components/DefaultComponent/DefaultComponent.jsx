import React from 'react';

function DefaultComponent({ children }) {
  return (
    <div>
      <header>
        <h1>Header - Healthcare Store</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default DefaultComponent;
