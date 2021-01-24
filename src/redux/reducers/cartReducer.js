import { ADD_TO_CART, REMOVE_FROM_CART } from '../types';

const currentState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems'))
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
};
export const cartReducer = (state = currentState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { cartItems: action.payload.cartItems };
    case REMOVE_FROM_CART:
      return { cartItems: action.payload.cartItems };
    default:
      return state;
  }
};
