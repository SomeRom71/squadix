import { getCategories, getProducts, getProduct, upProduct } from '../services/stock';
import {
  SET_CATEGORIES,
  SET_FILTERS,
  SET_PRODUCTS,
  SET_POST,
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

export const upProductAction = async (id) => {
  return async (dispatch) => {
    const product = await upProduct(id);
    
    dispatch({
      type: SET_POST,
      payload: product?.data
    })
  }
}