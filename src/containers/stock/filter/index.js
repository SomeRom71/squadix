import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '../../../components/checkbox';
import Button from '../../../components/button';
import { setFilters } from '../../../actions/stock-actions';
import { toast } from 'react-toastify';

import s from './filter.module.scss';

const Filter = () => {

  const dispatch = useDispatch();

  const [checkedCategories, setCheckedCategories] = useState([]);
  const categories = useSelector(state => state.stock.categories);
  
  const onCheckHandler = (value, name) => {
    if (!value) {
      const newValues = checkedCategories.filter(item => item !== name);
      setCheckedCategories(newValues);
      return;
    }
    setCheckedCategories([...checkedCategories, name]);
  }

  useEffect(() => {
    const allCategories = categories?.map(item => item.name);
    setCheckedCategories(allCategories);
    dispatch(setFilters(allCategories));
  }, [categories])

  const setFiltersHandler = () => {
    if (checkedCategories.length) {
      dispatch(setFilters(checkedCategories));
      return;
    }
    toast.error('Выберите хотя бы одну категорию!');
  }

  return (
    <div className={s.filter}>
      <span className={s.title}>Категории</span>
      {categories?.map(({id, name}) => (
        <Checkbox
          className={s.checkbox}
          key={id} 
          label={name} 
          id={id} 
          checked={checkedCategories.includes(name)} 
          onChange={(value) => onCheckHandler(value, name)}
        />
      ))}
      <Button
        className={s.btn}
        onClick={setFiltersHandler}
        text="Применить" 
      />
    </div>
  )
}

export default Filter;
