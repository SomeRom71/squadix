import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import AddButton from '../../components/add-btn';
import { setCategories, setProducts } from '../../actions/stock-actions';
import { useDispatch, useSelector } from 'react-redux';
import Filter from './filter';
import StockFeed from './feed';
import { ERRORS } from '../../constants/error.constants';
import { toast } from 'react-toastify';

import s from './stock.module.scss';

const StockContainer = () => {

  const dispatch = useDispatch();
  const filters = useSelector(state => state.stock.filters);
  const { content, totalPages } = useSelector(state => state.stock);
  const [isLoading, setIsLoading] = useState(false);


  const onChangePage = async (page) => {
    try {
      setIsLoading(true);
      await dispatch(setProducts(page));
    } catch(e) {
      toast.error(ERRORS[e?.response?.data?.message])
    } finally {
      setIsLoading(false);
    } 
  }

  const onAdd = () => {

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
      <AddButton onClick={onAdd} />
      <Filter />
      <StockFeed
        isLoading={isLoading}
        list={content} 
        totalPages={totalPages}
        onChangePage={onChangePage}
      />
    </Layout>
  )

}

export default StockContainer;
