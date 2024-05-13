import { isAxiosError } from 'axios';

import { authApi } from '@/api/authApi';
import { ERROR_MESSAGES } from '@/utils/constants';

import type { MessageResponseDto, RegisterResponseDto, LoginResponseDto, AuthRequestDto } from '@/types';

export interface ConfirmEmailPayload {
  emailVerificationCode: string;
}

export const login = async (payload: AuthRequestDto): Promise<LoginResponseDto> => {
  try {
    const userData = await authApi.login(payload);
    return {
      ...userData,
    };
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response?.status === 401) {
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }
      throw new Error(
        (err.response?.data as { message: string }).message || ERROR_MESSAGES.GENERAL_ERROR,
      );
    } else {
      throw err;
    }
  }
};

export const register = async (payload: AuthRequestDto): Promise<RegisterResponseDto> => {
  try {
    return await authApi.register(payload);
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response?.status === 409) {
        throw new Error(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
      }
      throw new Error(
        (err.response?.data as { message: string }).message || ERROR_MESSAGES.GENERAL_ERROR,
      );
    } else {
      throw err;
    }
  }
};

export const confirmEmail = async (
  payload: ConfirmEmailPayload,
  params: { email?: string },
): Promise<MessageResponseDto | undefined> => {
  try {
    return await authApi.confirmEmail(payload, params);
  } catch (err) {
    console.error('Email Confirmation Error:', err);
    throw err;
  }
};

export const sendPasswordResetEmail = async (payload: {
  email: string;
}): Promise<MessageResponseDto> => {
  try {
    return await authApi.sendPasswordResetEmail(payload);
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response?.status === 404) {
        throw new Error(ERROR_MESSAGES.EMAIL_NOT_FOUND);
      }
      throw new Error(
        (err.response?.data as { message: string }).message || ERROR_MESSAGES.GENERAL_ERROR,
      );
    }
    throw err;
  }
};

export const resetPassword = async (payload: {
  token: string;
  password: string;
}): Promise<MessageResponseDto> => {
  try {
    return await authApi.resetPassword(payload);
  } catch (err) {
    console.error('Send Password Reset Error:', err);
    throw err;
  }
};

