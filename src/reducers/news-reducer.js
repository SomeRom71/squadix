const initialState = {
  currentPage: 0,
  totalPages: 0,
  content: [],
};

export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case 'setNews':
      return {
        ...state,
        ...action.payload,
      };
    case 'clearNews':
      return {
        ...state,
        content: [],
      };
    default:
      return state;
  }
}
