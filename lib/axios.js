// frontend/lib/axios.js
import axios from 'axios';

// Create an Axios instance pointing to your backend
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
});

// Attach JWT from localStorage to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  console.log('Auth header set to:', token && `Bearer ${token}`);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
