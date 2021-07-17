import axios from 'axios';
import { API_URL } from '../constants/api.constants';

export const getUsers = (name, page) => {
  return axios.get(`${API_URL}users`, {
    params: {
      name: name,
      page
    }
  })
}
