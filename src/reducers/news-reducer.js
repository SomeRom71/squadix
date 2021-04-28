const initialState = {};

export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case 'setNews':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
