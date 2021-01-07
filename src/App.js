import React, { useState } from 'react';
import Products from './components/Products';
import data from './data.json';
import './app.css';
import Filter from './components/Filter';

function App() {
  const [products, setProduct] = useState(data.products);
  const [size, setSize] = useState('');
  const [order, setOrder] = useState('');

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
      setProduct(() => data.products);
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
            <Products products={products} />
          </div>
          <div className='sidebar'>cart name</div>
        </div>
      </main>
      <footer>All right are preserved</footer>
    </div>
  );
}

export default App;
