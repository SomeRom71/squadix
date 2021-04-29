import axios from 'axios';

export const getEvents = (page) => {
  return axios.get(`https://api.squadix.co/events?page=${page}`)
}
