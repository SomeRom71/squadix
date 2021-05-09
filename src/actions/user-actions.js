import { me, getUser, sendAvatar, sendUserData } from '../services/user';
import { SET_ME, SET_USER, SET_AVATAR } from '../constants/actions.constants';

export const setMe = (token) => {
  return async (dispatch) => {
    const userData = await me(token);
    dispatch({
      type: SET_ME,
      payload: userData?.data
    })
  }
}

export const updateMe = (data) => {
  return async (dispatch) => {
    const userData = await sendUserData(data);
    dispatch({
      type: SET_ME,
      payload: userData?.data
    })
  }
}

export const setUser = (id) => {
  return async (dispatch) => {
    const userData = await getUser(id);
    dispatch({
      type: SET_USER,
      payload: userData?.data
    })
  }
}

export const updateAvatar = (file) => {
  return async (dispatch) => {
    const avatar = await sendAvatar(file);

    dispatch({
      type: SET_AVATAR,
      payload: avatar?.data?.profilePictureUrl
    })
  }
}
