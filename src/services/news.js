import axios from 'axios';

export const getNews = (page) => {
  return axios.get(`https://api.squadix.co/posts?page=${page}`)
}

export const getNewsPostComments = (id) => {
  return axios.get(`https://api.squadix.co/posts/${id}/comments`)
}

export const getNewsPost = (id) => {
  return axios.get(`https://api.squadix.co/posts/${id}`)
}

export const addNewsPost = (data) => {
  return axios.post(`https://api.squadix.co/posts`, data)
}

export const likeNews = (id) => {
  return axios.put(`https://api.squadix.co/posts/${id}/like`)
}

export const likeNewsComment = (id) => {
  return axios.put(`https://api.squadix.co/posts/comments/${id}/like`)
}

export const addNewsPostComment = (id, data) => {
  return axios.post(`https://api.squadix.co/posts/${id}/comments`, data)
}
