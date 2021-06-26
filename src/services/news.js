import axios from 'axios';
import { API_URL } from '../constants/api.constants';

export const getNews = (page) => {
  return axios.get(`${API_URL}posts?page=${page}`)
}

export const getAuthorNews = (id, page) => {
  return axios.get(`${API_URL}posts/`, {
    params: {
      authorId: id,
      page
    }
  })
}

export const getNewsPostComments = (id) => {
  return axios.get(`${API_URL}posts/${id}/comments`)
}

export const getNewsPost = (id) => {
  return axios.get(`${API_URL}posts/${id}`)
}

export const addNewsPost = (data) => {
  return axios.post(`${API_URL}posts`, data)
}

export const likeNews = (id) => {
  return axios.put(`${API_URL}posts/${id}/like`)
}

export const likeNewsComment = (id) => {
  return axios.put(`${API_URL}posts/comments/${id}/like`)
}

export const addNewsPostComment = (id, data) => {
  return axios.post(`${API_URL}posts/${id}/comments`, data)
}
