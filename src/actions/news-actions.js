import { 
  getNews, 
  likeNews, 
  likeNewsComment, 
  getNewsPost, 
  addNewsPost, 
  getNewsPostComments, 
  addNewsPostComment,
  getAuthorNews
} from '../services/news';
import {
  SET_NEWS,
  SET_NEWS_POST,
  SET_NEWS_POST_COMMENTS,
  CLEAR_NEWS_POST,
  LIKE_NEWS,
  SET_NEWS_COMMENT,
  LIKE_NEWS_POST,
  CLEAR_NEWS,
  ADD_NEWS_POST,
  SET_PROFILE_NEWS
} from '../constants/actions.constants';

export const setNews = (page) => {
  return async (dispatch) => {
    const news = await getNews(page);
    dispatch({
      type: SET_NEWS,
      payload: news?.data
    })
  }
}

export const setProfileNews = (id, page) => {
  return async (dispatch) => {
    const news = await getAuthorNews(id, page);
    dispatch({
      type: SET_PROFILE_NEWS,
      payload: news?.data
    })
  }
}

export const setNewsPost = (id) => {
  return async (dispatch) => {
    const post = await getNewsPost(id);
    dispatch({
      type: SET_NEWS_POST,
      payload: post?.data
    })
  }
}

export const addNewPost = (data) => {
  return async (dispatch) => {
    const newPost = await addNewsPost(data);
    dispatch({
      type: ADD_NEWS_POST,
      payload: newPost?.data
    })
  }
}

export const setNewsPostComments = (id) => {
  return async (dispatch) => {
    const comments = await getNewsPostComments(id);
    dispatch({
      type: SET_NEWS_POST_COMMENTS,
      payload: comments?.data
    })
  }
}

export const clearNewsPost = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_NEWS_POST,
      payload: {}
    })
  }
}

export const toggleLikeNews = (id) => {
  return async (dispatch, getState) => {
    const likes = await likeNews(id);
    const newsList = getState().news.content;

    const newNewsState = newsList.map(item => {
      if (item.id === id) {
        return {...item, ...likes.data}
      }
      return item;
    });

    dispatch({
      type: LIKE_NEWS,
      payload: newNewsState
    })
  }
}

export const toggleLikeNewsComment = (id) => {
  return async (dispatch, getState) => {
    const likes = await likeNewsComment(id);
    const commentsList = getState().news.comments.content;

    const newCommentsState = commentsList.map(item => {
      if (item.id === id) {
        return {...item, ...likes.data}
      }
      return item;
    });
    
    dispatch({
      type: SET_NEWS_COMMENT,
      payload: newCommentsState
    })
  }
}

export const setNewsPostComment = (id, data) => {
  return async (dispatch, getState) => {
    const comment = await addNewsPostComment(id, data);
    const commentsList = getState().news.comments.content;

    const newCommentsState = [...commentsList, comment.data];
    
    dispatch({
      type: SET_NEWS_COMMENT,
      payload: newCommentsState
    })
  }
}

export const toggleLikePostNews = (id) => {
  return async (dispatch, getState) => {
    const likes = await likeNews(id);
    const newsPost = getState().news.post;

    dispatch({
      type: LIKE_NEWS_POST,
      payload: {...newsPost, ...likes.data}
    })
  }
}

export const clearNews = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_NEWS,
      payload: {}
    })
  }
}
