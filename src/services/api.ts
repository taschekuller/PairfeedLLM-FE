import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || 'http://localhost:5001', // PATH TO BE
});

export default api;
