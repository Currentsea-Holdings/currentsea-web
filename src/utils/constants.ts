export const BASE_URL = import.meta.env.BASE_URL || 'http://localhost:3000';
export const BASE_API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
export const TIMEOUT = import.meta.env.TIMEOUT || 15000;
export const HEADERS = { 'Content-Type': 'application/json', Accept: 'application/json' };
export const API_VERSION = 'alpha';
// export const AUTH_TOKEN_STORAGE_KEY = 'authToken';
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
};
