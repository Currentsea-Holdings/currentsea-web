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
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    return await api.post(API_ENDPOINTS.LOGIN, payload, { withCredentials: true });
  },

  register: async (payload: LoginPayload): Promise<RegisterResponse> => {
    return await api.post(API_ENDPOINTS.REGISTER, payload, { withCredentials: true });
  },

  confirmEmail: async (
    payload: ConfirmEmailPayload,
    params: { email?: string } = {},
  ): Promise<ConfirmEmailResponse> => {
    return await api.post(API_ENDPOINTS.CONFIRM_VERIFICATION_CODE, payload, {
      withCredentials: true,
      params,
    });
  },

  sendPasswordResetEmail: async (payload: { email: string }): Promise<RegisterResponse> => {
    return await api.post(API_ENDPOINTS.FORGOT_PASSWORD, payload, { withCredentials: true });
  },

  resetPasssword: async (payload: LoginPayload): Promise<RegisterResponse> => {
    return await api.post(API_ENDPOINTS.RESET_PASSWORD, payload, { withCredentials: true });
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
