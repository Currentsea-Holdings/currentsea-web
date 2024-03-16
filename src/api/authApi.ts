import { axiosClient as api } from '@/api/axiosClient';
import { AxiosError } from 'axios';
import { API_ENDPOINTS } from '@/utils/constants';
import { isDevelopmentMode } from '@/utils';

// const mockLogin = ({ email }: LoginPayload) => {
//   console.warn('Using mock data');
//   mock.onPost(API_ENDPOINTS.LOGIN).reply(({ data }: AxiosRequestConfig<string>) => {
//     const { email, password } = JSON.parse(data as string);

//     const responseBody = {
//       user: {
//         id: 1,
//         name: 'John Doe',
//         email: email,
//         roles: ['creator'],
//       },
//     };

//     return new Promise((resolve) => {
//       setTimeout(() => {
//         if (email && password) {
//           resolve([200, responseBody]);
//         } else {
//           resolve([400, 'Missing username or password']);
//         }
//       }, 2000);
//     });
//   });
// };

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

export const authApi = {
  login: async (payload: LoginPayload) => {
      // if (isDevelopmentMode()) mockLogin(payload);
      const res: LoginResponse = await api.post(API_ENDPOINTS.LOGIN, payload, {
        withCredentials: true,
      });
      return res;
  },

  register: async (payload: LoginPayload) => {
    try {
      const res: RegisterResponse = await api.post(API_ENDPOINTS.REGISTER, payload, {
        withCredentials: true,
      });
      return res;
    } catch (err) {
      throw new Error(
        err instanceof AxiosError && err.response
          ? `Login failed: ${err.response.status} ${err.response.data}`
          : 'An unexpected error occurred during login.',
      );
    }
  },

  confirmEmail: async (payload: ConfirmEmailPayload, params: { email?: string } = {}) => {
    try {
      const res: ConfirmEmailResponse = await api.post(
        API_ENDPOINTS.CONFIRM_VERIFICATION_CODE,
        payload,
        { withCredentials: true, params },
      );
      return res;
    } catch (err) {
      throw new Error(
        err instanceof AxiosError && err.response
          ? `Email verification failed: ${err.response.status} ${err.response.data}`
          : 'An unexpected error occurred during verification.',
      );
    }
  },

  // profile: async () => {
  //   try {
  //     const res = await api.get('auth/profile', { withCredentials: true });
  //     console.log(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },
};

// export const profile = async () => {
//   try {
//     const res = await api.get('auth/profile', { withCredentials: true });
//     console.log(res.data);
//   } catch (err) {
//     console.error(err);
//   }
// };
