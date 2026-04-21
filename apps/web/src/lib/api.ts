import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';

import { AUTH_TOKEN_KEY } from '@/store/useAuthStore';

export function buildApiClient(): AxiosInstance {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
    withCredentials: true,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (typeof window === 'undefined') {
      return config;
    }

    const token = window.localStorage.getItem(AUTH_TOKEN_KEY);

    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401 && typeof window !== 'undefined') {
        window.localStorage.removeItem(AUTH_TOKEN_KEY);
        window.dispatchEvent(new Event('coaching-ops:logout'));
      }

      return Promise.reject(error);
    },
  );

  return api;
}

export const api = buildApiClient();
