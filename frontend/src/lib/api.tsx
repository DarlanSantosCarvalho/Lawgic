// src/lib/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

api.interceptors.request.use((config) => {
  console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
  return new Promise((resolve) => {
    setTimeout(() => resolve(config), 500);
  });
});

api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);