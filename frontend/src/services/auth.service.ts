import axios from 'axios';
import type { LoginCredentials, RegisterCredentials, User } from '../types/auth.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
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

const login = async (credentials: LoginCredentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return { token, user };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Erro ao fazer login');
    }
    throw new Error('Erro ao fazer login');
  }
};

const register = async (credentials: RegisterCredentials) => {
  try {
    const response = await api.post('/users/register', credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return { token, user };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Erro ao registrar usuário');
    }
    throw new Error('Erro ao registrar usuário');
  }
};

const getMe = async (): Promise<User> => {
  const response = await api.get("/users/me");
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const authService = {
  login,
  register,
  getMe,
  logout,
  isAuthenticated,
};