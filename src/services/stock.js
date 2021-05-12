import axios from 'axios';
import { API_URL } from '../constants/api.constants';

export const getCategories = () => {
  return axios.get(`${API_URL}categories`)
}

export const getProducts = (filter, page) => {
  return axios.get(`${API_URL}products/filter`, {
    params: {
      categories: filter.join(','),
      page: page,
      sortDir: 'DESC',
      sortField: 'createdAt'
    }
  })
}

export const getProduct = (id) => {
  return axios.get(`${API_URL}products/${id}`)
}

export const addProduct = (data) => {
  return axios.post(`${API_URL}products/`, data)
}
