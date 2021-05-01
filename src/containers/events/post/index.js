import React, { useEffect } from 'react';
import Layout from '../../layout';
import { 
  setEventsPost, 
  clearEventsPost, 
  toggleLikePostEvent, 
  toggleLikeEventsComment, 
  setEventsPostComments, 
  setEventsPostComment 
} from '../../../actions/events-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import FeedItem from '../../feed/item';
import { toast } from 'react-toastify';
import { ERRORS } from '../../../constants/error.constants';
import Comments from '../../comments';

import s from './post.module.scss';

const PostContainer = () => {

  const dispatch = useDispatch();
  const post = useSelector(state => state.events.post);
  const { content: comments } = useSelector(state => state.events.comments);

  const { id } = useParams();

  const addComment = (data) => {
    dispatch(setEventsPostComment(id, data));
  }

  useEffect(() => {
    (async () => {
      await Promise.all([
        dispatch(setEventsPost(id)),
        dispatch(setEventsPostComments(id))
      ]);
    })()
    return () => dispatch(clearEventsPost());
  }, []);

  const EventsPostLikeHandler = async (id) => {
    try {
      await dispatch(toggleLikePostEvent(id));
    } catch(e) {
      toast.error(ERRORS[e?.response?.data?.message])
    }
  }

  const CommentLikeHandler = async (id) => {
    try {
      await dispatch(toggleLikeEventsComment(id));
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
          onLike={(id) => EventsPostLikeHandler(id)}
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
