import { userProfileApi } from '@/api/userProfileApi';
import { isAxiosError } from 'axios';
import { ERROR_MESSAGES } from '@/utils/constants';

export interface CreateUserProfilePayload {
  userId: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phoneNumber?: string;
  profilePicture?: string;
  shortBio?: string;
  city: string;
  state: string;
  country: string;
}

export interface UpdateUserProfilePayload {
  id: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phoneNumber?: string;
  profilePicture?: string;
  shortBio?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface UserProfileResponse {
  id: string;
  email: string;
  emailVerified: boolean;
  city: string;
  state: string;
  country: string;
}

export const createUserProfile = async (payload: CreateUserProfilePayload): Promise<UserProfileResponse> => {
  try {
    return await userProfileApi.createUserProfile(payload);
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(ERROR_MESSAGES.GENERAL_ERROR);
    } else {
      throw err;
    }
  }
};

export const updateUserProfile = async ({ id, ...payload }: UpdateUserProfilePayload): Promise<UserProfileResponse> => {
  try {
    return await userProfileApi.updateUserProfile(id, payload);
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(ERROR_MESSAGES.GENERAL_ERROR);
    } else {
      throw err;
    }
  }
};

export const fetchUserProfileById = async (id?: string): Promise<UserProfileResponse> => {
  if (!id) {
    throw new Error('No user id provided');
  }
  try {
    return await userProfileApi.getUserProfileById(id);
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    } else {
      throw err;
    }
  }
};

export const fetchAllUserProfiles = async (): Promise<UserProfileResponse[]> => {
  try {
    return await userProfileApi.getAllUserProfiles();
  } catch (err) {
    console.error('Fetch All UserProfiles Error:', err);
    throw err;
  }
};

export const deleteUserProfile = async (id: string): Promise<void> => {
  try {
    await userProfileApi.deleteUserProfile(id);
    return;
  } catch (err) {
    console.error('Delete UserProfile Error:', err);
    throw err;
  }
};
