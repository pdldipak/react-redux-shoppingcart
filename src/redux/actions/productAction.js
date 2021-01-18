import { FETCH_PRODUCTS } from '../types';

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch('/api/products');
  const data = await res.json();
  // console.log('data-', data);
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

// we don't need any parameter in this func,  as this function going to fetch all the products not to filter 