import axios from 'axios';

const api = axios.create({
  baseURL: 'https://taskmanager-8kbj.onrender.com/api/',
  withCredentials: true,
});

export default api;
