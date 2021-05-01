const initialState = {
  currentPage: 0,
  totalPages: 0,
  content: [],
  post: {},
  comments: []
};

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case 'setEvents':
      return {
        ...state,
        ...action.payload,
      };
    case 'setEventsPost':
      return {
        ...state,
        post: action.payload,
      };
    case 'setEventsPostComments':
      return {
        ...state,
        comments: action.payload,
      };
    case 'likeEventsPost':
      return {
        ...state,
        post: action.payload,
      };
    case 'setEventComment':
      return {
        ...state,
        comments: {
          ...state.comments,
          content: action.payload
        },
      };
    case 'likeEvent':
      return {
        ...state,
        content: action.payload,
      };
    case 'clearEventsPost':
      return {
        ...state,
        post: {},
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
