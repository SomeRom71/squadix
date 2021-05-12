import axios from 'axios';
import { API_URL } from '../constants/api.constants';

export const authUser = (data) => {
  return axios.post(`${API_URL}signin`, data)
}

export const changePass = (data) => {
  return axios.patch(`${API_URL}users/me`, data)
}

export const createUser = (data) => {
  return axios.post(`${API_URL}users`, data)
}
