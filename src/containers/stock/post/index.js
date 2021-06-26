import React, { useEffect } from 'react';
import FeedItem from '../feed/item';
import { 
  setStockPost, 
  clearStockPost
} from '../../../actions/stock-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Layout from '../../layout';
import { upProductAction } from '../../../actions/stock-actions';
import { toast } from 'react-toastify';
import { ERRORS } from '../../../constants/error.constants';

import s from './post.module.scss';

const PostContainer = () => {

  const dispatch = useDispatch();
  const post = useSelector(state => state.stock.post);
  const me = useSelector(state => state.user.me);

  const { id } = useParams();

  const upProductHandler = async (id) => {
    try {
      await dispatch(upProductAction(id));
      toast.success('Товар успешно обновлен');
    } catch (e) {
      toast.error(ERRORS[e.response.data.message] || e.response.data.message);
    }
  }

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
        me={me}
        upProduct={upProductHandler}
      />
    </Layout>
  )
}

export default PostContainer;
