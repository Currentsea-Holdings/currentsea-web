import { isAxiosError } from 'axios';
import { serialize } from 'object-to-formdata';

import { userProfileApi } from '@/api/userProfileApi';
import { ERROR_MESSAGES } from '@/utils/constants';

import type { UserProfile } from '@/stores/authStore';

export interface RateDetail {
  platform: string;
  type: string;
  rate: string;
}

export interface ContentDetail {
  file: File[];
}

export interface CreateUserProfile {
  userId: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phoneNumber?: string;
  profilePicture?: File | null;
  shortBio?: string;
  city: string;
  state: string;
  rates?: RateDetail[];
  country: string;
}

interface Industry {
  id: number;
  name: string;
}

export interface UpdateUserProfile {
  id: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phoneNumber?: string;
  shortBio?: string;
  city?: string;
  state?: string;
  industries?: Industry[];
  rates?: RateDetail[];
  emailInvites?: string[];
  showcaseContent?: ContentDetail[];
  hasFullProfile?: boolean;
  country?: string;
  userProfileCompleted?: boolean;
}

export interface UploadProfilePicture {
  id: string;
  profilePicture?: File | null;
}

export const createUserProfile = async (data: CreateUserProfile): Promise<UserProfile> => {
  try {
    const formData = serialize(data);

    return await userProfileApi.createUserProfile(formData);
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(ERROR_MESSAGES.GENERAL_ERROR);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const updateUserProfile = async (data: UpdateUserProfile): Promise<UserProfile> => {
  const { id, ...payload } = data;
  try {
    return await userProfileApi.updateUserProfile(id, payload);
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(ERROR_MESSAGES.GENERAL_ERROR);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const fetchUserProfileById = async (id?: string): Promise<UserProfile> => {
  if (!id) {
    throw new Error('No user id provided');
  }
  try {
    return await userProfileApi.getUserProfileById(id);
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const fetchAllUserProfiles = async (): Promise<UserProfile[]> => {
  try {
    return await userProfileApi.getAllUserProfiles();
  } catch (err) {
    console.error('Fetch All UserProfiles Error:', err);
    throw new Error('An unexpected error occurred');
  }
};

export const deleteUserProfile = async (id: string): Promise<void> => {
  try {
    await userProfileApi.deleteUserProfile(id);
    return;
  } catch (err) {
    console.error('Delete UserProfile Error:', err);
    throw new Error('An unexpected error occurred');
  }
};

export const uploadProfilePicture = async (data: UploadProfilePicture): Promise<UserProfile> => {
  const { id, ...payload } = data;
  try {
    const formData = serialize(payload);

    return await userProfileApi.uploadProfilePicture(id, formData);
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(ERROR_MESSAGES.GENERAL_ERROR);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

/* USER PROFILE CREATION UPLOADING FOR SHOWCASE CONTENT */
export const uploadShowCaseContent = async (formData: FormData): Promise<UserProfile> => {
  try {
    return await userProfileApi.uploadShowCaseContent(formData);
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(ERROR_MESSAGES.GENERAL_ERROR);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
