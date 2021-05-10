import axios from 'axios';

export const authUser = (data) => {
  return axios.post('https://api.squadix.co/signin', data)
}

export const changePass = (data) => {
  return axios.patch('https://api.squadix.co/users/me', data)
}

export const createUser = (data) => {
  return axios.post('https://api.squadix.co/users', data)
}
