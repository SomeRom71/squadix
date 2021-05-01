import { getNews, likeNews, likeNewsComment, getNewsPost, getNewsPostComments, addNewsPostComment } from '../services/news';

export const setNews = (page) => {
  return async (dispatch) => {
    const news = await getNews(page);
    dispatch({
      type: 'setNews',
      payload: news?.data
    })
  }
}

export const setNewsPost = (id) => {
  return async (dispatch) => {
    const post = await getNewsPost(id);
    dispatch({
      type: 'setNewsPost',
      payload: post?.data
    })
  }
}

export const setNewsPostComments = (id) => {
  return async (dispatch) => {
    const comments = await getNewsPostComments(id);
    dispatch({
      type: 'setNewsPostComments',
      payload: comments?.data
    })
  }
}

export const clearNewsPost = () => {
  return async (dispatch) => {
    dispatch({
      type: 'clearNewsPost',
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
      type: 'likeNews',
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
      type: 'setNewsComment',
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
      type: 'setNewsComment',
      payload: newCommentsState
    })
  }
}

export const toggleLikePostNews = (id) => {
  return async (dispatch, getState) => {
    const likes = await likeNews(id);
    const newsPost = getState().news.post;

    dispatch({
      type: 'likeNewsPost',
      payload: {...newsPost, ...likes.data}
    })
  }
}

export const clearNews = () => {
  return async (dispatch) => {
    dispatch({
      type: 'clearNews',
      payload: {}
    })
  }
}
