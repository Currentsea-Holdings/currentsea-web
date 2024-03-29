import { axiosClient as api } from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/utils/constants';

export interface CreateUserPayload {
  email: string;
  password: string;
  emailVerified: boolean;
  emailVerificationCode?: string;
  verificationCodeExpires?: Date;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  user_type?: 'Creator' | 'Agency' | 'Brand';
  refreshToken?: string;
  emailVerified?: boolean;
}

export interface UserResponse {
  id: string;
  email: string;
  emailVerified: boolean;
}

export const usersApi = {
  createUser: async (payload: CreateUserPayload): Promise<UserResponse> => {
    return await api.post(API_ENDPOINTS.USERS, payload);
  },

  getAllUsers: async (): Promise<UserResponse[]> => {
    return await api.get(API_ENDPOINTS.USERS);
  },

  getUserById: async (id: string): Promise<UserResponse> => {
    return await api.get(`${API_ENDPOINTS.USERS}/${id}`);
  },

  updateUser: async (
    id: string,
    payload: UpdateUserPayload
  ): Promise<UserResponse> => {
    return await api.patch(`${API_ENDPOINTS.USERS}/${id}`, payload);
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`${API_ENDPOINTS.USERS}/${id}`);
  },
};