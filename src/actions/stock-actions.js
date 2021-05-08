import { getCategories, getProducts, getProduct, addProduct } from '../services/stock';
import {
  SET_CATEGORIES,
  SET_FILTERS,
  SET_PRODUCTS,
  SET_POST,
  ADD_NEW_PRODUCT
} from '../constants/actions.constants';

export const setCategories = () => {
  return async (dispatch) => {
    const categories = await getCategories();
    dispatch({
      type: SET_CATEGORIES,
      payload: categories?.data
    })
  }
}

export const setFilters = (filters) => {
  return async (dispatch) => {
    dispatch({
      type: SET_FILTERS,
      payload: filters
    })
  }
}

export const setProducts = (page) => {
  return async (dispatch, getState) => {
    const filterArr = getState().stock.filters;
    const products = await getProducts(filterArr, page);

    dispatch({
      type: SET_PRODUCTS,
      payload: products?.data
    })
  }
}

export const addNewProduct = (data) => {
  return async (dispatch, getState) => {
    const filterArr = getState().stock.filters;
    const newProduct = await addProduct(data);

    const isIncluded = filterArr.includes(newProduct?.data?.category);
    
    // if (isIncluded) {
    //   dispatch({
    //     type: ADD_NEW_PRODUCT,
    //     payload: newProduct?.data
    //   })
    // }

  }
}

export const setStockPost = (id) => {
  return async (dispatch) => {
    const product = await getProduct(id);

    dispatch({
      type: SET_POST,
      payload: product?.data
    })
  }
}

export const clearStockPost = (id) => {
  return async (dispatch) => {
    dispatch({
      type: SET_POST,
      payload: {}
    })
  }
}
