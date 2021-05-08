import { 
  getEvents,
  getEventsPostComments,
  getEventPost,
  likeEventsComment,
  addEventsPostComment,
  likeEvent,
  addNewEvent
} from '../services/events';
import {
  SET_EVENTS,
  SET_EVENTS_POST,
  SET_EVENTS_POST_COMMENTS,
  CLEAR_EVENTS_POST,
  SET_EVENT_COMMENT,
  LIKE_EVENT,
  LIKE_EVENTS_POST,
  CLEAR_EVENTS,
  ADD_EVENTS_POST
} from '../constants/actions.constants';

export const setEvents = (page) => {
  return async (dispatch) => {
    const events = await getEvents(page);
    dispatch({
      type: SET_EVENTS,
      payload: events?.data
    })
  }
}

export const setEventsPost = (id) => {
  return async (dispatch) => {
    const post = await getEventPost(id);
    dispatch({
      type: SET_EVENTS_POST,
      payload: post?.data
    })
  }
}

export const addNewEvents = (data) => {
  return async (dispatch) => {
    const newEvent = await addNewEvent(data);
    dispatch({
      type: ADD_EVENTS_POST,
      payload: newEvent?.data
    })
  }
}

export const setEventsPostComments = (id) => {
  return async (dispatch) => {
    const comments = await getEventsPostComments(id);
    dispatch({
      type: SET_EVENTS_POST_COMMENTS,
      payload: comments?.data
    })
  }
}

export const clearEventsPost = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_EVENTS_POST,
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
      type: SET_EVENT_COMMENT,
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
      type: SET_EVENT_COMMENT,
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
      type: LIKE_EVENT,
      payload: newEventsState
    })
  }
}

export const toggleLikePostEvent = (id) => {
  return async (dispatch, getState) => {
    const likes = await likeEvent(id);
    const eventPost = getState().events.post;

    dispatch({
      type: LIKE_EVENTS_POST,
      payload: {...eventPost, ...likes.data}
    })
  }
}

export const clearEvents = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_EVENTS,
      payload: {}
    })
  }
}
