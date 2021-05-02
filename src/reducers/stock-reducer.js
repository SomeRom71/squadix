const initialState = {
  currentPage: 0,
  totalPages: 0,
  content: [],
  categories: [],
  filters: [],
};

export default function stockReducer(state = initialState, action) {
  switch (action.type) {
    case 'setCategories':
      return {
        ...state,
        categories: action.payload,
      };
    case 'setFilters':
      return {
        ...state,
        filters: action.payload,
      };
    case 'setProducts':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
