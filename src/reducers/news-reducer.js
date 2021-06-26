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

const initialState = {
  currentPage: 0,
  totalPages: 0,
  content: [],
  post: {},
  comments: [],
  profileNews: [],
};

export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_PROFILE_NEWS:
      return {
        ...state,
        profileNews: action.payload,
      };
    case SET_NEWS_POST:
      return {
        ...state,
        post: action.payload,
      };
    case SET_NEWS_POST_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case LIKE_NEWS:
      return {
        ...state,
        content: action.payload,
      };
    case LIKE_NEWS_POST:
      return {
        ...state,
        post: action.payload,
      };
    case SET_NEWS_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          content: action.payload
        },
      };
    case CLEAR_NEWS:
      return {
        ...state,
        content: [],
      };
    case CLEAR_NEWS_POST:
      return {
        ...state,
        post: {},
      };
    case ADD_NEWS_POST:
      return {
        ...state,
        content: [
          action.payload,
          ...state.content,
        ],
      };
    default:
      return state;
  }
}
