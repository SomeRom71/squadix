import { getUsers } from '../services/search';
import { SET_SEARCH_RESULT, CLEAR_SEARCH_RESULT } from '../constants/actions.constants';
  
  export const setSearchResult = (name, page) => {
    return async (dispatch) => {
      const users = await getUsers(name, page);
      dispatch({
        type: SET_SEARCH_RESULT,
        payload: {...users?.data, currentPage: page}
      })
    }
  }

  export const clearSearchResult = () => {
    return async (dispatch) => {
      dispatch({
        type: CLEAR_SEARCH_RESULT,
        payload: {}
      })
    }
  }
  