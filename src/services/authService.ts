import api from './api';


export const register = async (userData: { name: string; email: string; password: string; role: string; }) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (credentials: { email: string; password: string; }) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};
