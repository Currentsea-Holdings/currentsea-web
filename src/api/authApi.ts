import { api, mock } from '@/api';
import { useAuthStore } from '@/stores/authStore';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const isDevelopmentMode = process.env.NODE_ENV === 'development';

interface LoginPayload {
  email?: string;
  password?: string;
}

const mockLogin = () => {
  console.warn('Using mock data');
  mock.onPost('auth/login').reply(({ data }: AxiosRequestConfig<string>) => {
    const { email, password } = JSON.parse(data as string);

    const responseBody = {
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@doe.com',
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

interface LoginResponse {
  user: {
    id: string;
    email: string;
  };
  token: string;
}

export const authApi = {
  login: async (payload: LoginPayload) => {
    try {
      if (isDevelopmentMode) mockLogin();
      const response = await api.post('auth/login', payload, { withCredentials: true });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(`Login failed: ${error.response.status} ${error.response.data}`);
      } else {
        throw new Error('An unexpected error occurred during login.');
      }
    }
  },
  
  profile: async () => {
    try {
      const response = await api.get('auth/profile', { withCredentials: true });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  },
};

export const postLogin = async (payload: LoginPayload): Promise<AxiosResponse> => {
    console.log('Logging in');
    if (isDevelopmentMode) mockLogin();

    return await api.post('auth/login', payload, { withCredentials: true });
};

export const profile = async () => {
  try {
    const response = await api.get('auth/profile', { withCredentials: true });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// email: 'john@doe.coms',
// password: 'Password1@',
