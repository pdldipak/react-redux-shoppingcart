import React, { useState, useEffect } from 'react';
import Products from './components/Products';
import './app.css';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('newCartItems'))
      ? JSON.parse(localStorage.getItem('newCartItems'))
      : []
  );
  // const [count, setCount] = useState(1);
  useEffect(() => {
    localStorage.setItem('newCartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const removeFromCart = (product) => {
    setCartItems((cartItems) =>
      cartItems.filter((item) => item._id !== product._id)
    );
    localStorage.setItem('newCartItems', JSON.stringify(cartItems));
  };

  const addToCart = (product) => {
    const newCartItems = cartItems.slice();
    let alreadyInCart = false;
    newCartItems.forEach((item) => {
      if (item._id === product._id) {
        // setCount(item.count++ );
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      newCartItems.push({ ...product, count: 1 });
    }
    setCartItems(newCartItems);
    localStorage.setItem(
      'newCartItems',
      JSON.stringify(newCartItems)
    );
  };

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
              <Products addToCart={addToCart} />
            </div>
            <div className='sidebar'>
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                createOrder={createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All right are preserved</footer>
      </div>
    </Provider>
  );
}

export default App;
