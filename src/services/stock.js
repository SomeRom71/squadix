import axios from 'axios';

export const getCategories = () => {
  return axios.get(`https://api.squadix.co/categories`)
}

export const getProducts = (filter, page) => {
  return axios.get(`https://api.squadix.co/products/filter`, {
    params: {
      categories: filter.join(','),
      page: page,
      sortDir: 'DESC',
      sortField: 'createdAt'
    }
  })
}

export const getProduct = (id) => {
  return axios.get(`https://api.squadix.co/products/${id}`)
}
