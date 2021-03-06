import React, { useState, useEffect } from 'react';
import { Fade, Zoom } from 'react-reveal';
import Modal from 'react-modal';
import formatCurrency from '../util';
import './products.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/actions/productAction';
import { addToCart } from '../redux/actions/cartAction';

function Products() {
  const [product, setProduct] = useState(null);
  const products = useSelector(
    (state) => state.products.filteredItems
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const openModal = (product) => {
    setProduct(product);
  };
  const closeModal = () => {
    setProduct();
  };
  return (
    <div>
      <Fade bottom cascade={true}>
        {!products ? (
          <h4 style={{ color: 'red' }}>Loading.....</h4>
        ) : (
          <ul className='products'>
            {products.map((product) => (
              <li key={product._id}>
                <div className='product'>
                  <a
                    href={'#' + product._id}
                    onClick={() => openModal(product)}
                  >
                    <div className='image-container'>
                      <img
                        src={product.image}
                        alt={product.title}
                      ></img>
                    </div>
                    <p>{product.title}</p>
                  </a>
                  <div className='product-price'>
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className='button-primary'
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Fade>
      {product && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button className='close-modal' onClick={closeModal}>
              x
            </button>
            <div className='product-details'>
              <img src={product.image} alt={product.title}></img>
              <div className='product-details-description'>
                <p>
                  <strong>{product.title}</strong>
                </p>
                <p>{product.description}</p>
                <p>
                  Available Sizes:{' '}
                  {product.availableSizes.map((x) => (
                    <span>
                      {' '}
                      <button className='button'>{x}</button>
                    </span>
                  ))}
                </p>
                <div className='product-price'>
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    className='button primary'
                    onClick={() => {
                      dispatch(addToCart(product));
                      closeModal();
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
}

export default Products;
