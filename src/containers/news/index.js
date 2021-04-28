import React, { useEffect } from 'react';
import Layout from '../layout';
import Feed from '../feed';
import { setNews } from '../../actions/news-actions';
import { useDispatch, useSelector } from 'react-redux';

const NewsContainer = () => {

  const dispatch = useDispatch();
  const news = useSelector(state => state.news);

  useEffect(() => {
    dispatch(setNews());
  }, [])

  return (
    <Layout>
      <Feed list={news?.content} />
    </Layout>
  )

}

export default NewsContainer;
