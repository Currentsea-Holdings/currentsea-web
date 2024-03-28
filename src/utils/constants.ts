export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;
export const TIMEOUT = import.meta.env.TIMEOUT || 15000;

export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  CONFIRM_VERIFICATION_CODE: '/auth/confirm-email-verification-code',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Incorrect email or password. Please try again.',
  EMAIL_ALREADY_EXISTS: 'This email is already in use. If this is your email, please log in or reset your password.',
  EMAIL_NOT_FOUND: 'Email not found. Please try again.',
}