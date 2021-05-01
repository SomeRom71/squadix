const initialState = {
  currentPage: 0,
  totalPages: 0,
  content: [],
  post: {},
  comments: []
};

export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case 'setNews':
      return {
        ...state,
        ...action.payload,
      };
    case 'setNewsPost':
      return {
        ...state,
        post: action.payload,
      };
    case 'setNewsPostComments':
      return {
        ...state,
        comments: action.payload,
      };
    case 'likeNews':
      return {
        ...state,
        content: action.payload,
      };
    case 'likeNewsPost':
      return {
        ...state,
        post: action.payload,
      };
    case 'setNewsComment':
      return {
        ...state,
        comments: {
          ...state.comments,
          content: action.payload
        },
      };
    case 'clearNews':
      return {
        ...state,
        content: [],
      };
    case 'clearNewsPost':
      return {
        ...state,
        post: {},
      };
    default:
      return state;
  }
}
