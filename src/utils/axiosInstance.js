import axios from 'axios';
import AuthService from '../services/authService';

const axiosInstance = axios.create({
  baseURL: '/api'
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = AuthService.getInstance().getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      AuthService.getInstance().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 