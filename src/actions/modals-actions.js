export const openModal = (modal, params = {}) => {
  return (dispatch) => {
    dispatch({
      type: 'changeModalsState',
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
      type: 'changeModalsState',
      payload: {
        [modal]: {}
      }
    })
  }
}
