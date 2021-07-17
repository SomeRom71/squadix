import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import cn from 'classnames';
import Feed from '../feed/user-feed';
import s from './search.module.scss';
import { setSearchResult, clearSearchResult } from '../../actions/search-actions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ERRORS } from '../../constants/error.constants';
import Input from '../../components/input';
import Button from '../../components/button';

const SearchContainer = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {content, totalPages, currentPage} = useSelector(state => state.search);

  useEffect(() => {
    dispatch(setSearchResult(name, 0));
    return () => dispatch(clearSearchResult());
  }, []);

  const onChangeHandler = async (page) => {
    try {
      setIsLoading(true);
      await dispatch(setSearchResult(name, page));
    } catch(e) {
      toast.error(ERRORS[e?.response?.data?.message])
    } finally {
      setIsLoading(false);
    } 
  }

  return (
    <Layout>
      <div className={s.feed}>
        <Input
          placeholder="Имя пользователя"
          value={name} 
          onChange={setName}
          wrapperClassname={cn(s.input, s.inputWrap)}
          className={s.input}
        />
        <Button 
          text="Поиск"
          onClick={() => onChangeHandler(0)}
          className={s.button}
        />
      </div>
      <Feed 
        isLoading={isLoading}
        list={content}
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangeHandler}
      />
    </Layout>
  )

}

export default SearchContainer;
