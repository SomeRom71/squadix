import axios from 'axios';

export const me = (token) => {
  return axios.get('https://api.squadix.co/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
