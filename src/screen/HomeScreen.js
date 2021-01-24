import React from 'react';
import Cart from '../components/Cart';
import Filter from '../components/Filter';
import Products from '../components/Products';

function HomeScreen() {
  return (
    <div className='content'>
      <div className='main'>
        <Filter />
        <Products />
      </div>
      <div className='sidebar'>
        <Cart />
      </div>
    </div>
  );
}

export default HomeScreen;
