import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8386/api',
  withCredentials: false,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data ? response.data : response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;