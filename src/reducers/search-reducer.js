import { SET_SEARCH_RESULT, CLEAR_SEARCH_RESULT } from '../constants/actions.constants';

const initialState = {}

export default function modalsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_RESULT:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_SEARCH_RESULT:
      return {
        ...state,
        content: [],
      };
    default:
      return state;
  }
}
