import axios from 'axios';

export const getEvents = (page) => {
  return axios.get(`https://api.squadix.co/events?page=${page}`)
}

export const getEventsPostComments = (id) => {
  return axios.get(`https://api.squadix.co/events/${id}/comments`)
}

export const getEventPost = (id) => {
  return axios.get(`https://api.squadix.co/events/${id}`)
}

export const likeEventsComment = (id) => {
  return axios.put(`https://api.squadix.co/events/comments/${id}/like`)
}

export const addEventsPostComment = (id, data) => {
  return axios.post(`https://api.squadix.co/events/${id}/comments`, data)
}

export const likeEvent = (id) => {
  return axios.put(`https://api.squadix.co/events/${id}/like`)
}
