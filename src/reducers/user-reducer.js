import { SET_ME } from '../constants/actions.constants';

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ME:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
