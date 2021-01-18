import React, { useState, useEffect } from 'react';
import { Fade, Zoom } from 'react-reveal';
import Modal from 'react-modal';
import formatCurrency from '../util';
import './products.css';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/actions/productAction';

function Products({ products, addToCart }) {
  const [product, setProduct] = useState(null);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    // setLoading(true);
  }, []);

  const openModal = (product) => {
    setProduct(product);
  };
  const closeModal = () => {
    setProduct();
  };
  return (
    <div>
      <Fade bottom cascade={true}>
        {/* {loading ? ( */}
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
                      onClick={() => addToCart(product)}
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
                      addToCart(product);
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

export default connect(
  (state) => ({ products: state.products.items }),
  fetchProducts
)(Products);

// const mapStateToProps = (state) => ({
//   products: state.products.items,
// });

// const mapDispatchToProps = (dispatch)=>({fetchProducts:()=>dispatch(fetchProducts())})

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Products);
