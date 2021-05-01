import React, { useEffect } from 'react';
import Layout from '../../layout';
import { 
  setNewsPost, 
  clearNewsPost, 
  toggleLikePostNews, 
  toggleLikeNewsComment, 
  setNewsPostComments, 
  setNewsPostComment 
} from '../../../actions/news-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import FeedItem from '../../feed/item';
import { toast } from 'react-toastify';
import { ERRORS } from '../../../constants/error.constants';
import Comments from '../../comments';

import s from './post.module.scss';

const PostContainer = () => {

  const dispatch = useDispatch();
  const post = useSelector(state => state.news.post);
  const { content: comments } = useSelector(state => state.news.comments);

  const { id } = useParams();

  const addComment = (data) => {
    dispatch(setNewsPostComment(id, data));
  }

  useEffect(() => {
    (async () => {
      await Promise.all([
        dispatch(setNewsPost(id)),
        dispatch(setNewsPostComments(id))
      ]);
    })()
    return () => dispatch(clearNewsPost());
  }, []);

  const NewsPostLikeHandler = async (id) => {
    try {
      await dispatch(toggleLikePostNews(id));
    } catch(e) {
      toast.error(ERRORS[e?.response?.data?.message])
    }
  }

  const CommentLikeHandler = async (id) => {
    try {
      await dispatch(toggleLikeNewsComment(id));
    } catch(e) {
      toast.error(ERRORS[e?.response?.data?.message])
    }
  }

  return (
    <Layout>
      <div className={s.wrap}>
        <FeedItem
          isPost
          info={post}
          onLike={(id) => NewsPostLikeHandler(id)}
          className={s.post}
        />
        <Comments 
          onLike={CommentLikeHandler}
          list={comments}
          addComment={addComment}
        />
      </div>
    </Layout>
  )

}

export default PostContainer;
