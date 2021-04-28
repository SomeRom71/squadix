const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'setMe':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
