import React from 'react';
import formatCurrency from '../util';
import './products.css';

function Products({ products, setProducts, addToCart }) {
  return (
    <div>
      <ul className='products'>
        {products.map((product) => (
          <li key={product._id}>
            <div className='product'>
              <a href={'#' + product._id}>
                <div className='image-container'>
                  <img src={product.image} alt={product.title}></img>
                </div>
                <p>{product.title}</p>
              </a>
              <div className='product-price'>
                <div>{formatCurrency(product.price)}</div>
                <button className='button-primary' onClick={() => addToCart( product)}>
                  Add To Cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
