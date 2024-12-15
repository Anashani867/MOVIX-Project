import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',// for the laravel api
});

export default api;
