import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import Feed from '../feed';
import { setNews, clearNews, toggleLikeNews } from '../../actions/news-actions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ERRORS } from '../../constants/error.constants';

const NewsContainer = () => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {content, totalPages, currentPage} = useSelector(state => state.news);

  useEffect(() => {
    dispatch(setNews(0));
    return () => dispatch(clearNews());
  }, []);

  const onChangePage = async (page) => {
    try {
      setIsLoading(true);
      await dispatch(setNews(page));
    } catch(e) {
      toast.error(ERRORS[e?.response?.data?.message])
    } finally {
      setIsLoading(false);
    } 
  }

  const NewsLikeHandler = async (id) => {
    try {
      await dispatch(toggleLikeNews(id));
    } catch(e) {
      toast.error(ERRORS[e?.response?.data?.message])
    }
  }

  return (
    <Layout>
      <Feed 
        onLike={NewsLikeHandler}
        isLoading={isLoading}
        list={content}
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </Layout>
  )

}

export default NewsContainer;
