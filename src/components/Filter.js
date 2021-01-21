import React from 'react';
import {
  filterProducts,
  sortProducts,
} from '../redux/actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import './filter.css';

function Filter() {
  const filteredProducts = useSelector(
    (state) => state.products.filteredItems
  );
  const sort = useSelector((state) => state.products.sort);
  const size = useSelector((state) => state.products.size);
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();
  return (
    <>
      {!filteredProducts ? (
        <div>Loading....</div>
      ) : (
        <div className='filter'>
          <div className='filter-result'>
            {filteredProducts.length} Products
          </div>
          <div className='filter-sort'>
            Order:
            <select
              value={sort}
              onChange={(e) =>
                dispatch(
                  sortProducts(filteredProducts, e.target.value)
                )
              }
            >
              <option value='latest'>Latest</option>
              <option value='lowest'>Lowest</option>
              <option value='highest'>Highest</option>
            </select>
          </div>
          <div className='filter-size'>
            Filter:
            <select
              value={size}
              onChange={(e) =>
                dispatch(filterProducts(products, e.target.value))
              }
            >
              <option value=''>ALL</option>
              <option value='XS'>XS</option>
              <option value='S'>S</option>
              <option value='M'>M</option>
              <option value='L'>L</option>
              <option value='XL'>XL</option>
              <option value='XXL'>XXL</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
}

export default Filter;
