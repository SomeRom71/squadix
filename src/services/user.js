import axios from 'axios';

export const me = (token) => {
  return axios.get('https://api.squadix.co/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const getUser = (id) => {
  return axios.get(`https://api.squadix.co/users/${id}`)
}

export const sendAvatar = (file) => {
  return axios.post(`https://api.squadix.co/users/me/avatar`, file)
}

export const sendUserData = (data) => {
  return axios.put(`https://api.squadix.co/users/me`, data)
}
