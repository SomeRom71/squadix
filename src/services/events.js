import axios from 'axios';
import { API_URL } from '../constants/api.constants';

export const getEvents = (page) => {
  return axios.get(`${API_URL}events?page=${page}`)
}

export const getEventsPostComments = (id) => {
  return axios.get(`${API_URL}events/${id}/comments`)
}

export const getEventPost = (id) => {
  return axios.get(`${API_URL}events/${id}`)
}

export const addNewEvent = (data) => {
  return axios.post(`${API_URL}events`, data)
}

export const likeEventsComment = (id) => {
  return axios.put(`${API_URL}events/comments/${id}/like`)
}

export const addEventsPostComment = (id, data) => {
  return axios.post(`${API_URL}events/${id}/comments`, data)
}

export const likeEvent = (id) => {
  return axios.put(`${API_URL}events/${id}/like`)
}

export const getAddressByCoords = (lan, lon) => {
  return axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=7166ec2458efb8&lat=${lan}&lon=${lon}&format=json`);
}
