import {
  SET_EVENTS,
  SET_EVENTS_POST,
  SET_EVENTS_POST_COMMENTS,
  CLEAR_EVENTS_POST,
  SET_EVENT_COMMENT,
  LIKE_EVENT,
  LIKE_EVENTS_POST,
  CLEAR_EVENTS,
} from '../constants/actions.constants';

const initialState = {
  currentPage: 0,
  totalPages: 0,
  content: [],
  post: {},
  comments: []
};

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_EVENTS_POST:
      return {
        ...state,
        post: action.payload,
      };
    case SET_EVENTS_POST_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case LIKE_EVENTS_POST:
      return {
        ...state,
        post: action.payload,
      };
    case SET_EVENT_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          content: action.payload
        },
      };
    case LIKE_EVENT:
      return {
        ...state,
        content: action.payload,
      };
    case CLEAR_EVENTS_POST:
      return {
        ...state,
        post: {},
      };
    case CLEAR_EVENTS:
      return {
        ...state,
        content: [],
      };
    default:
      return state;
  }
}
