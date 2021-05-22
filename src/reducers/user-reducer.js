import { SET_ME, SET_USER, SET_AVATAR, REMOVE_AVATAR } from '../constants/actions.constants';

const initialState = {
  me: {},
  profile: {}
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ME:
      return {
        ...state,
        me: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        profile: action.payload,
      };
    case SET_AVATAR:
      return {
        ...state,
        me: {
          ...state.me,
          profilePictureUrl: action.payload
        },
      };
    case REMOVE_AVATAR:
      return {
        ...state,
        me: {
          ...state.me,
          profilePictureUrl: null,
        },
      };
    default:
      return state;
  }
}
