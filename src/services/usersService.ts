import { isAxiosError } from 'axios';

import { usersApi } from '@/api/usersApi';
import { ERROR_MESSAGES } from '@/utils/constants';

import type { UserProfile } from '@/stores/authStore';
import type { User } from '@/stores/authStore';

export interface CreateUser {
  email: string;
  password: string;
  emailVerified: boolean;
  emailVerificationCode?: string | null;
  verificationCodeExpires?: string | null;
}

export interface UpdateUser {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  userType?: 'Creator' | 'Agency' | 'Brand';
  refreshToken?: string;
  emailVerified?: boolean;
  hasFullProfile?: boolean;
}

export const createUser = async (data: CreateUser): Promise<User> => {
  try {
    return await usersApi.createUser(data);
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(ERROR_MESSAGES.GENERAL_ERROR);
    } else {
      throw err;
    }
  }
};

export const updateUser = async (data: UpdateUser): Promise<User> => {
  const { id, ...payload } = data;
  try {
    return await usersApi.updateUser(id, payload);
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(ERROR_MESSAGES.GENERAL_ERROR);
    } else {
      throw err;
    }
  }
};

export const fetchUserById = async (id: string): Promise<User> => {
  try {
    return await usersApi.getUserById(id);
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    } else {
      throw err;
    }
  }
};

export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    return await usersApi.getAllUsers();
  } catch (err) {
    console.error('Fetch All Users Error:', err);
    throw err;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await usersApi.deleteUser(id);
    return;
  } catch (err) {
    console.error('Delete User Error:', err);
    throw err;
  }
};

export const getUserUserProfile = async (id?: string): Promise<UserProfile | undefined> => {
  if (!id) {
    throw new Error('No user id provided');
  }
  try {
    return await usersApi.getUserUserProfile(id);
  } catch (err) {
    return undefined;
  }
};
