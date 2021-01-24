import React, { useState } from 'react';
import { Fade, Zoom } from 'react-reveal';
import Modal from 'react-modal';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import formatCurrency from '../util';
import './cart.css';
import { removeFromCart } from '../redux/actions/cartAction';
import {
  createOrder,
  clearOrder,
} from '../redux/actions/orderAction';

function Cart() {
  //console.log('cartItems-', cartItems);
  const [showCheckout, setShowCheckout] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const order = useSelector((state) => state.order.order);

  const handleOrder = (e) => {
    e.preventDefault();
    const order = {
      name: name,
      email: email,
      address: address,
      cartItems: cartItems,
      total: cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    dispatch(createOrder(order));
  };
  const closeModal = () => {
    dispatch(clearOrder());
  };
  return (
    <div>
      {cartItems.length === 0 ? (
        <div className='cart cart-header'>Cart is empty</div>
      ) : (
        <div className='cart cart-header'>
          You have {cartItems.length} in the cart.
        </div>
      )}

      {order && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button className='close-modal' onClick={closeModal}>
              x
            </button>
            <div className='order-details'>
              <h3 className='success-message'>
                Your order has been placed.
              </h3>
              <h2>Order {order._id}</h2>
              <ul>
                <li>
                  <div>Name:</div>
                  <div>{order.name}</div>
                </li>
                <li>
                  <div>Email:</div>
                  <div>{order.email}</div>
                </li>
                <li>
                  <div>Address:</div>
                  <div>{order.address}</div>
                </li>
                <li>
                  <div>Date:</div>
                  <div>
                    <Moment>
                      {order.createdAt}
                    </Moment>
                  </div>
                </li>
                <li>
                  <div>Total:</div>
                  <div>{formatCurrency(order.total)}</div>
                </li>
                <li>
                  <div>Cart Items:</div>
                  <div>
                    {order.cartItems.map((x) => (
                      <div>
                        {x.count} {' x '} {x.title}
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </Zoom>
        </Modal>
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
                      onClick={() => dispatch(removeFromCart(item))}
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
      {cartItems.length !== 0 && showCheckout && (
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
