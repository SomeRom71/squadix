import { CHANGE_MODALS_STATE } from '../constants/actions.constants';

const initialState = {
  commentModal: {},
  postModal: {},
  productModal: {},
  changePassModal: {},
}

export default function modalsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MODALS_STATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
