import { axiosClient as api } from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/utils/constants';

import type { User, UserProfile } from '@/stores/authStore';
import type { CreateUserDto, UpdateUserDto } from './types';

export const usersApi = {
  createUser: async (payload: CreateUserDto): Promise<User> => {
    return await api.post(API_ENDPOINTS.USERS, payload);
  },

  getAllUsers: async (): Promise<User[]> => {
    return await api.get(API_ENDPOINTS.USERS);
  },

  getUserById: async (id: string): Promise<User> => {
    return await api.get(`${API_ENDPOINTS.USERS}/${id}`);
  },

  updateUser: async (id: string, payload: UpdateUserDto): Promise<User> => {
    return await api.patch(`${API_ENDPOINTS.USERS}/${id}`, payload);
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`${API_ENDPOINTS.USERS}/${id}`);
  },

  getUserUserProfile: async (id: string): Promise<UserProfile> => {
    return await api.get(`${API_ENDPOINTS.USERS}/${id}/profile`);
  },
};
