import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { productsReducer } from './reducers/productReducers';

const initialState = {};

const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
const middlewareList = [thunk, logger];
const enhancer = composeEnhancer(applyMiddleware(...middlewareList));

const store = createStore(
  combineReducers({
    products: productsReducer,
  }),
  initialState,
  enhancer
);

export default store;

// import { createStore, applyMiddleware, compose, combineReducers } from "redux";
// import thunk from "redux-thunk";
// import { productsReducer } from "./reducers/productReducers";


// const initialState = {};
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   combineReducers({
//     products: productsReducer,
//   }),
//   initialState,
//   composeEnhancer(applyMiddleware(thunk))
// );
// export default store;

