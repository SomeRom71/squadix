import axios from 'axios';

export const getNews = (page) => {
  return axios.get(`https://api.squadix.co/posts?page=${page}`)
}
