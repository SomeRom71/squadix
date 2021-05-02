import React, { useEffect } from 'react';
import Layout from '../layout';
import { setCategories, setProducts } from '../../actions/stock-actions';
import { useDispatch, useSelector } from 'react-redux';
import Filter from './filter';
import StockFeed from './feed';

import s from './stock.module.scss';

const StockContainer = () => {

  const dispatch = useDispatch();
  const filters = useSelector(state => state.stock.filters);
  const { content, totalPages } = useSelector(state => state.stock);
  
  const onChangePage = (page) => {
    dispatch(setProducts(page));
  }

  useEffect(() => {
    dispatch(setCategories());
  }, [])

  useEffect(() => {
    if (filters.length) {
      dispatch(setProducts(0));
    }
  }, [filters])

  return (
    <Layout className={s.layout}>
      <Filter />
      <StockFeed
        list={content} 
        totalPages={totalPages}
        onChangePage={onChangePage}
      />
    </Layout>
  )

}

export default StockContainer;
