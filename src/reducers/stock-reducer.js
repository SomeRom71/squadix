import {
  SET_CATEGORIES,
  SET_FILTERS,
  SET_PRODUCTS,
  SET_POST,
} from '../constants/actions.constants';

const initialState = {
  currentPage: 0,
  totalPages: 0,
  content: [],
  categories: [],
  filters: [],
  post: {},
};

export default function stockReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
}
