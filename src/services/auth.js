import axios from 'axios';

export const authUser = (data) => {
  return axios.post('https://api.squadix.co/signin', data)
}

export const createUser = (data) => {
  return axios.post('https://api.squadix.co/users', data)
}
