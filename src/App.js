import React, { useState } from 'react';
import Products from './components/Products';
import data from './data.json';
import './app.css'

function App() {
  const [products, setProduct] = useState(data.products);
  const [size, setSize] = useState('');
  const [sort, setSort] = useState('');

  return (
    <div className='grid-container'>
      <header>
        <a href='/'>React Shopping card</a>
      </header>
      <main>
        <div className='content'>
        <div className='main'>
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
