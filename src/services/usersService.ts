import { usersApi } from '@/api/usersApi';
import { isAxiosError } from 'axios';
import { ERROR_MESSAGES } from '@/utils/constants';

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
  user_type?: 'Creator' | 'Agency' | 'Brand';
}

export const createUser = async (payload: CreateUserPayload): Promise<UserResponse> => {
  try {
    return await usersApi.createUser(payload);
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(ERROR_MESSAGES.GENERAL_ERROR);
    } else {
      throw err;
    }
  }
};

export const updateUser = async (id: string, payload: UpdateUserPayload): Promise<UserResponse> => {
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

export const fetchUserById = async (id: string): Promise<UserResponse> => {
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

export const fetchAllUsers = async (): Promise<UserResponse[]> => {
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
