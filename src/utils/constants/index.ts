export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;
export const TIMEOUT = import.meta.env.TIMEOUT || 15000;
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export * from './api-endpoints.constants';
export * from './error-messages.constants';
export * from './states.constants';
