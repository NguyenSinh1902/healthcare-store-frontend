import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8386/api', // Adjusted to backend URL
  withCredentials: false, // Set to false to avoid CORS issues with wildcard origin
});

instance.interceptors.request.use(
  (config) => {
    // Attach tokens to headers
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
    // Handle global errors here (e.g., 401 Unauthorized)
    return Promise.reject(error);
  }
);

export default instance;