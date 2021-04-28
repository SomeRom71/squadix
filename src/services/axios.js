import axios from 'axios';

export const configureInterceptors = (history, token) => {

  axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  
  axios.interceptors.response.use((response) => {
    return response
  }, async function (error) {
    const originalRequest = error.config;
    if ((error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {
      localStorage.removeItem('accessToken');
      history.push('/login');
    }
    return Promise.reject(error);
  });

} 
