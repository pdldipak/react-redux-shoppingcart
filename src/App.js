import React, { useState, useEffect } from 'react';
import Products from './components/Products';
import data from './data.json';
import './app.css';
import Filter from './components/Filter';
import Cart from './components/Cart';

function App() {
  const [products, setProduct] = useState(data.products);
  const [size, setSize] = useState('');
  const [order, setOrder] = useState('');
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('newCartItems')) ?
    JSON.parse(localStorage.getItem('newCartItems')) : []
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
    alert('Need to save order for' + JSON.stringify(order))
  }
  const sortByOrder = (e) => {
    e.preventDefault();
    //  console.log('order-', e.target.value)
    setOrder(() => e.target.value);
    setProduct(() =>
      [...products]
        .slice()
        .sort((a, b) =>
          order === 'lowest'
            ? a.price > b.price
              ? 1
              : -1
            : order === 'highest'
            ? a.price < b.price
              ? -1
              : 1
            : a._id < b._id
            ? 1
            : -1
        )
    );
  };

  const sortBySize = (e) => {
    e.preventDefault();
    console.log('Size-', e.target.value);
    if (e.target.value === '') {
      setProduct(() => products);
      setSize(() => e.target.value);
    } else {
      setSize(() => e.target.value);
      setProduct((products) =>
        data.products.filter(
          (product) =>
            product.availableSizes.indexOf(e.target.value) >= 0
        )
      );
    }
  };

  return (
    <div className='grid-container'>
      <header>
        <a href='/'>React Shopping card</a>
      </header>
      <main>
        <div className='content'>
          <div className='main'>
            <Filter
              count={products.length}
              size={size}
              sortBySize={sortBySize}
              sortByOrder={sortByOrder}
              order={order}
            />
            <Products products={products} addToCart={addToCart} />
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
  );
}

export default App;
