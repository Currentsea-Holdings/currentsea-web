import { authApi } from '@/api/authApi';

interface LoginPayload {
  email?: string;
  password?: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
  };
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    return await authApi.login(payload);
  } catch (err) {
    console.error('Login Error:', err);
    throw err;
  }
};

export const fetchProfile = async () => {};
