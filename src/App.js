import React, { useState, useEffect } from 'react';
import Products from './components/Products';
import './app.css';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
  const createOrder = (order) => {
    alert('Need to save order for' + JSON.stringify(order.name));
  };

  return (
    <Provider store={store}>
      <div className='grid-container'>
        <header>
          <a href='/'>React Shopping card</a>
        </header>
        <main>
          <div className='content'>
            <div className='main'>
              <Filter />
              <Products />
            </div>
            <div className='sidebar'>
              <Cart createOrder={createOrder} />
            </div>
          </div>
        </main>
        <footer>All right are preserved</footer>
      </div>
    </Provider>
  );
}

export default App;
