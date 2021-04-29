import React, { useEffect } from 'react';
import Layout from '../layout';
import Feed from '../feed';
import { setNews, clearNews } from '../../actions/news-actions';
import { useDispatch, useSelector } from 'react-redux';

const NewsContainer = () => {

  const dispatch = useDispatch();
  const {content, totalPages, currentPage} = useSelector(state => state.news);

  useEffect(() => {
    dispatch(setNews(0));
    return () => dispatch(clearNews());
  }, []);

  const onChangePage = (page) => {
    dispatch(setNews(page));
  }

  return (
    <Layout>
      <Feed 
        list={content}
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </Layout>
  )

}

export default NewsContainer;
