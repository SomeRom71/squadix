import { me, getUser, sendAvatar, sendUserData, deleteAvatar } from '../services/user';
import { getAuthorNews } from '../services/news';
import { getAuthorProduct } from '../services/stock';
import { SET_ME, SET_USER, SET_AVATAR, REMOVE_AVATAR } from '../constants/actions.constants';

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

export const removeAvatar = () => {
  return async (dispatch) => {
    await deleteAvatar();
    dispatch({
      type: REMOVE_AVATAR,
    })
  }
}

export const setUser = (id) => {
  return async (dispatch) => {
    const userData = await getUser(id);
    const userPost = await getAuthorNews(id);
    const userProducts = await getAuthorProduct(id);
    dispatch({
      type: SET_USER,
      payload: {
        ...userData?.data,
        totalPosts: userPost?.data.totalElements,
        totalProducts: userProducts?.data.totalElements
      }
    })
  }
}

export const clearUser = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_USER,
      payload: {}
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
