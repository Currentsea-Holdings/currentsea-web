import { authApi } from '@/api/authApi';
import { isAxiosError } from 'axios';

export interface LoginPayload {
  email?: string;
  password?: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
  };
  message: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
  };
  message: string;
}

export interface ConfirmEmailPayload {
  emailVerificationCode: string;
}

export interface ConfirmEmailResponse {
  message: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const userData = await authApi.login(payload);
    return userData;
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      if (err.response.status === 401) {
        throw new Error('Incorrect email or password. Please try again.');
      }
      throw new Error((err.response.data as { message: string }).message || 'An unknown error occurred');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const register = async (payload: LoginPayload): Promise<RegisterResponse> => {
  try {
    return await authApi.register(payload);
  } catch (err) {
    console.error('Registration Error:', err);
    throw err;
  }
};

export const confirmEmail = async (payload: ConfirmEmailPayload, params: { email?: string }): Promise<ConfirmEmailResponse | undefined> => {
  try {
    return await authApi.confirmEmail(payload, params);
  } catch (err) {
    console.error('Email Confirmation Error:', err);
    throw err;
  }
};

export const fetchProfile = async () => {};
