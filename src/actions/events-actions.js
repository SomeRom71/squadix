import { 
  getEvents,
  getEventsPostComments,
  getEventPost,
  likeEventsComment,
  addEventsPostComment,
  likeEvent,
} from '../services/events';

export const setEvents = (page) => {
  return async (dispatch) => {
    const events = await getEvents(page);
    dispatch({
      type: 'setEvents',
      payload: events?.data
    })
  }
}

export const setEventsPost = (id) => {
  return async (dispatch) => {
    const post = await getEventPost(id);
    dispatch({
      type: 'setEventsPost',
      payload: post?.data
    })
  }
}

export const setEventsPostComments = (id) => {
  return async (dispatch) => {
    const comments = await getEventsPostComments(id);
    dispatch({
      type: 'setEventsPostComments',
      payload: comments?.data
    })
  }
}

export const clearEventsPost = () => {
  return async (dispatch) => {
    dispatch({
      type: 'clearEventsPost',
      payload: {}
    })
  }
}

export const toggleLikeEventsComment = (id) => {
  return async (dispatch, getState) => {
    const likes = await likeEventsComment(id);
    const commentsList = getState().events.comments.content;

    const newCommentsState = commentsList.map(item => {
      if (item.id === id) {
        return {...item, ...likes.data}
      }
      return item;
    });
    
    dispatch({
      type: 'setEventComment',
      payload: newCommentsState
    })
  }
}

export const setEventsPostComment = (id, data) => {
  return async (dispatch, getState) => {
    const comment = await addEventsPostComment(id, data);
    const commentsList = getState().events.comments.content;

    const newCommentsState = [...commentsList, comment.data];
    
    dispatch({
      type: 'setEventComment',
      payload: newCommentsState
    })
  }
}

export const toggleLikeEvent = (id) => {
  return async (dispatch, getState) => {
    const likes = await likeEvent(id);
    const eventsList = getState().events.content;

    const newEventsState = eventsList.map(item => {
      if (item.id === id) {
        return {...item, ...likes.data}
      }
      return item;
    });

    dispatch({
      type: 'likeEvent',
      payload: newEventsState
    })
  }
}

export const toggleLikePostEvent = (id) => {
  return async (dispatch, getState) => {
    const likes = await likeEvent(id);
    const eventPost = getState().events.post;

    dispatch({
      type: 'likeEventsPost',
      payload: {...eventPost, ...likes.data}
    })
  }
}

export const clearEvents = () => {
  return async (dispatch) => {
    dispatch({
      type: 'clearEvents',
      payload: {}
    })
  }
}
