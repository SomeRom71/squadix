import axios from 'axios';

export const getNews = () => {
  return axios.get('https://api.squadix.co/posts')
}
