import { axiosClient as api } from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/utils/constants';

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

export const userProfileApi = {
  createUserProfile: async (payload: CreateUserProfilePayload): Promise<UserProfileResponse> => {
    return await api.post(API_ENDPOINTS.USER_PROFILE, payload);
  },

  getAllUserProfiles: async (): Promise<UserProfileResponse[]> => {
    return await api.get(API_ENDPOINTS.USER_PROFILE);
  },

  getUserProfileById: async (id: string): Promise<UserProfileResponse> => {
    return await api.get(`${API_ENDPOINTS.USER_PROFILE}/${id}`);
  },

  updateUserProfile: async (
    id: string,
    payload: UpdateUserProfilePayload
  ): Promise<UserProfileResponse> => {
    return await api.patch(`${API_ENDPOINTS.USER_PROFILE}/${id}`, payload);
  },

  deleteUserProfile: async (id: string): Promise<void> => {
    await api.delete(`${API_ENDPOINTS.USER_PROFILE}/${id}`);
  },
};