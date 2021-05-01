const initialState = {
  commentModal: {},
}

export default function modalsReducer(state = initialState, action) {
  switch (action.type) {
    case 'changeModalsState':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
