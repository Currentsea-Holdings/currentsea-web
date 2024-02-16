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

export const login = async (payload: LoginPayload): Promise<LoginResponse | undefined> => {
  try {
    const data: LoginResponse = await authApi.login(payload) as LoginResponse;
    return data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

export const fetchProfile = async () => {};
