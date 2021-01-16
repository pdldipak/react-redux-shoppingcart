import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import formatCurrency from '../util';
import './cart.css';

function Cart({ cartItems, removeFromCart, createOrder }) {
  //console.log('cartItems-', cartItems);
  const [showCheckout, setShowCheckout] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleOrder = (e) => {
    e.preventDefault();
    const order = {
      name: name,
      email: email,
      address: address,
      cartItems: cartItems,
    };
    createOrder(order);
  };
  return (
    <div>
      {cartItems.length === 0 ? (
        <div className='cart cart-header'>Cart is empty</div>
      ) : (
        <div className='cart cart-header'>
          You have {cartItems.length} in the cart{' '}
        </div>
      )}
      <div className='cart'>
        <Fade left cascade={true}>
          <ul className='cart-items'>
            {cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title}></img>
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className='right'>
                    {formatCurrency(item.price)} x {item.count}{' '}
                    <button
                      className='button'
                      onClick={() => removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
      </div>
      {cartItems.length !== 0 && (
        <div className='cart'>
          <div className='total'>
            <div>
              Total:
              {formatCurrency(
                cartItems.reduce((a, c) => a + c.price * c.count, 0)
              )}
            </div>
            <button
              onClick={() => setShowCheckout({ showCheckout: true })}
              className='button primary'
            >
              Proceed
            </button>
          </div>
        </div>
      )}
      {showCheckout && (
        <Fade right cascade={true}>
          <div className='cart'>
            <form onSubmit={handleOrder}>
              <ul className='form-container'>
                <li>
                  <label>Email</label>
                  <input
                    name='email'
                    type='email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label>Name</label>
                  <input
                    name='name'
                    value={name}
                    type='text'
                    required
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label>Address</label>
                  <input
                    name='address'
                    type='text'
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                </li>
                <li>
                  <button className='button primary' type='submit'>
                    Checkout
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </Fade>
      )}
    </div>
  );
}

export default Cart;
