import { CHANGE_MODALS_STATE } from '../constants/actions.constants';

export const openModal = (modal, params = {}) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_MODALS_STATE,
      payload: {
        [modal]: {
          show: true,
          params
        }
      }
    })
  }
}

export const closeModal = (modal) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_MODALS_STATE,
      payload: {
        [modal]: {}
      }
    })
  }
}
