import { me } from '../services/user';

export const setMe = (token) => {
  return async (dispatch) => {
    const userData = await me(token);
    dispatch({
      type: 'setMe',
      payload: userData?.data
    })
  }
}
