import axios from 'axios';

const localBaseURL = 'http://localhost:5000/api';
const baseURL = import.meta.env.DEV
  ? localBaseURL
  : (import.meta.env.VITE_API_URL || localBaseURL);

const API = axios.create({
  baseURL,
});

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;