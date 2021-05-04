import { me } from '../services/user';
import { SET_ME } from '../constants/actions.constants';

export const setMe = (token) => {
  return async (dispatch) => {
    const userData = await me(token);
    dispatch({
      type: SET_ME,
      payload: userData?.data
    })
  }
}
