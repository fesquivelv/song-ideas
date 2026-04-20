import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

// Define the client with the AxiosInstance type
const client: AxiosInstance = axios.create({
    // Fixed typo: baseURL instead of basseURL
    baseURL: (import.meta.env.VITE_API_URL as string) || 'http://localhost:3000/api',
});

// Interceptor to attach the JWT token
client.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
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

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si el servidor responde 401, el token no es válido o expiró
      localStorage.removeItem('token');
      window.location.href = '/login'; // Forzamos el salto al login
    }
    return Promise.reject(error);
  }
);

export default client;