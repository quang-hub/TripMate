// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',  // adjust as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API
export const registerUser = (data) => api.post('/user/register', data);
export const loginUser = (data) => api.post('/user/login', data);
export const logoutUser = () => api.post('/user/logout');
export const updateUserProfile = (data) => api.post('/user/update-profile', data);
export const searchUsers = (nickname) => api.get(`/user/search${nickname ? `?nickname=${encodeURIComponent(nickname)}` : ''}`);

// Export axios instance if needed
export default api;
