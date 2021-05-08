import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import AddButton from '../../components/add-btn';
import { setCategories, setProducts, addNewProduct } from '../../actions/stock-actions';
import { openModal } from '../../actions/modals-actions';
import { useDispatch, useSelector } from 'react-redux';
import Filter from './filter';
import StockFeed from './feed';
import { ERRORS } from '../../constants/error.constants';
import { PRODUCT_MODAL } from '../../constants/modal.constants';
import { toast } from 'react-toastify';

import s from './stock.module.scss';

const StockContainer = () => {

  const dispatch = useDispatch();
  const { filters, categories } = useSelector(state => state.stock);
  console.log(categories)
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

  const openAddProductModal = () => {
    dispatch(openModal(PRODUCT_MODAL, {
      categories: categories,
      addProduct: (data) => dispatch(addNewProduct(data)),
    }))
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
      <AddButton onClick={openAddProductModal} />
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
