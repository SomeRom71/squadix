import axios from 'axios';
import { API_URL } from '../constants/api.constants';

export const me = (token) => {
  return axios.get(`${API_URL}users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const getUser = (id) => {
  return axios.get(`${API_URL}users/${id}`)
}

export const sendAvatar = (file) => {
  return axios.post(`${API_URL}users/me/avatar`, file)
}

export const deleteAvatar = () => {
  return axios.delete(`${API_URL}users/me/avatar`)
}

export const sendUserData = (data) => {
  return axios.put(`${API_URL}users/me`, data)
}
