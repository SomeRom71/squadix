import { getCategories, getProducts } from '../services/stock';

export const setCategories = () => {
  return async (dispatch) => {
    const categories = await getCategories();
    dispatch({
      type: 'setCategories',
      payload: categories?.data
    })
  }
}

export const setFilters = (filters) => {
  return async (dispatch) => {
    dispatch({
      type: 'setFilters',
      payload: filters
    })
  }
}

export const setProducts = (page) => {
  return async (dispatch, getState) => {
    const filterArr = getState().stock.filters;
    const products = await getProducts(filterArr, page);

    dispatch({
      type: 'setProducts',
      payload: products?.data
    })
  }
}
