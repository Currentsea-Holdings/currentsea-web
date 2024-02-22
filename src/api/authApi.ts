import { api, mock } from '@/api';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { isDevelopmentMode } from '@/utils';

const mockLogin = ({ email }: LoginPayload) => {
  console.warn('Using mock data');
  mock.onPost('auth/login').reply(({ data }: AxiosRequestConfig<string>) => {
    const { email, password } = JSON.parse(data as string);

    const responseBody = {
      user: {
        id: 1,
        name: 'John Doe',
        email: email,
        roles: ['creator'],
      },
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
          resolve([200, responseBody]);
        } else {
          resolve([400, 'Missing username or password']);
        }
      }, 2000);
    });
  });
};

export interface LoginPayload {
  email?: string;
  password?: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
  };
  // token: string;
}

export const authApi = {
  login: async (payload: LoginPayload) => {
    try {
      if (isDevelopmentMode()) mockLogin(payload);
      const res = await api.post('auth/login', payload, { withCredentials: true });
      return res.data as LoginResponse;
    } catch (err) {
      throw new Error(
        err instanceof AxiosError && err.response
          ? `Login failed: ${err.response.status} ${err.response.data}`
          : 'An unexpected error occurred during login.',
      );
    }
  },

  profile: async () => {
    try {
      const res = await api.get('auth/profile', { withCredentials: true });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  },
};

export const profile = async () => {
  try {
    const res = await api.get('auth/profile', { withCredentials: true });
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};
