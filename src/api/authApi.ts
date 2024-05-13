import { axiosClient as api } from '@/api/axiosClient';
import { AxiosError } from 'axios';
import { API_ENDPOINTS } from '@/utils/constants';
import { isDevelopmentMode } from '@/utils';
import type { LoginResponseDto, MessageResponseDto, RegisterResponseDto } from '@/types';

// const mockLogin = ({ email }: LoginPayload) => {
//   console.warn('Using mock data');
//   mock.onPost(API_ENDPOINTS.LOGIN).reply(({ data }: AxiosRequestConfig<string>) => {
//     const { email, password } = JSON.parse(data as string);

//     const responseBody = {
//       user: {
//         id: 1,
//         name: 'John Doe',
//         email: email,
//         roles: ['Creator'],
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
export interface RegisterPayload {
  email: string;
  password: string;
}

export interface ConfirmEmailPayload {
  emailVerificationCode: string;
}

export interface ConfirmEmailResponse {
  message: string;
}

export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResponseDto> => {
    return await api.post(API_ENDPOINTS.LOGIN, payload, { withCredentials: true });
  },

  register: async (payload: LoginPayload): Promise<RegisterResponseDto> => {
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

  sendPasswordResetEmail: async (payload: { email: string }): Promise<MessageResponseDto> => {
    return await api.post(API_ENDPOINTS.FORGOT_PASSWORD, payload, { withCredentials: true });
  },

  resetPassword: async (payload: { token: string; password: string; }): Promise<MessageResponseDto> => {
    return await api.post(API_ENDPOINTS.RESET_PASSWORD, payload, { withCredentials: true });
  },
};