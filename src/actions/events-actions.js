import { getEvents } from '../services/events';

export const setEvents = (page) => {
  return async (dispatch) => {
    const events = await getEvents(page);
    dispatch({
      type: 'setEvents',
      payload: events?.data
    })
  }
}

export const clearEvents = () => {
  return async (dispatch) => {
    dispatch({
      type: 'clearEvents',
      payload: {}
    })
  }
}
