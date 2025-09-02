// src/lib/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Backend na porta 3001
});

api.interceptors.request.use((config) => {
  console.log(`➡️ Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`⬅️ Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ Error: ${error.response?.status} ${error.config?.url}`);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data);
    return Promise.reject(error);
  }
);