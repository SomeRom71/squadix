const initialState = {
  currentPage: 0,
  totalPages: 0,
  content: [],
};

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case 'setEvents':
      return {
        ...state,
        ...action.payload,
      };
    case 'clearEvents':
      return {
        ...state,
        content: [],
      };
    default:
      return state;
  }
}
