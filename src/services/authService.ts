import { authApi } from '@/api/authApi';
import { AxiosResponse } from 'axios';

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
  };
  message: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    return await authApi.login(payload);
  } catch (err) {
    console.error('Login Error:', err);
    throw err;
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

export const fetchProfile = async () => {};
