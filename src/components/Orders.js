import React, { useEffect } from 'react';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../redux/actions/orderAction';
import formatCurrency from '../util';
import './order.css';

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  return (
    <>
      {!orders ? (
        <div>Orders</div>
      ) : (
        <div className='orders'>
          <h2>Orders</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADDRESS</th>
                <th>ITEMS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order._id}</td>
                  <td>
                    <Moment>{order.createdAt}</Moment>
                  </td>
                  <td> {formatCurrency(order.total)}</td>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>{order.address}</td>
                  <td>
                    {order.cartItems.map((item, index) => (
                      <div key={index}>
                        {item.count} {' x '} {item.title}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Orders;
