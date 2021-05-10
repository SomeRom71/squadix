import React, { useEffect } from 'react';
import FeedItem from '../feed/item';
import { 
  setStockPost, 
  clearStockPost
} from '../../../actions/stock-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Layout from '../../layout';

import s from './post.module.scss';

const PostContainer = () => {

  const dispatch = useDispatch();
  const post = useSelector(state => state.stock.post);

  const { id } = useParams();

  useEffect(() => {
    dispatch(setStockPost(id));
    return () => dispatch(clearStockPost());
  }, []);

  return (
    <Layout> 
      <FeedItem
        className={s.item} 
        info={post}
        isPost
      />
    </Layout>
  )
}

export default PostContainer;
