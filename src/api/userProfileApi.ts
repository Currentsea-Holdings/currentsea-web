import { axiosClient as api } from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/utils/constants';

import type { UserProfile } from '@/stores/authStore';
export interface GetShowCaseContentResponse {
  showcaseContent: string[];
}

export const userProfileApi = {
  createUserProfile: async (payload: FormData): Promise<UserProfile> => {
    return await api.post(API_ENDPOINTS.USER_PROFILE, payload);
  },

  updateUserProfile: async (id: string, payload: FormData): Promise<UserProfile> => {
    return await api.patch(`${API_ENDPOINTS.USER_PROFILE}/${id}`, payload);
  },

  getAllUserProfiles: async (): Promise<UserProfile[]> => {
    return await api.get(API_ENDPOINTS.USER_PROFILE);
  },

  getUserProfileById: async (id: string): Promise<UserProfile> => {
    return await api.get(`${API_ENDPOINTS.USER_PROFILE}/${id}`);
  },

  deleteUserProfile: async (id: string): Promise<void> => {
    await api.delete(`${API_ENDPOINTS.USER_PROFILE}/${id}`);
  },

  /* USER PROFILE UPLOADING SHOWCASE CONTENT */

  // upload showcase content
  uploadShowCaseContent: async (formData: FormData): Promise<UserProfile> => {
    const userId = formData.get('userId');
    if (typeof userId !== 'string') throw new Error('userId must be a string');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    return await api.post(
      `${API_ENDPOINTS.USER_PROFILE}/${userId}/showcase-content`,
      formData,
      config,
    );
  },

  // get showcase content
  getShowCaseContent: async (id: string): Promise<GetShowCaseContentResponse> => {
    const response = await api.get<GetShowCaseContentResponse>(
      `${API_ENDPOINTS.USER_PROFILE}/${id}/show-showcase-content`,
    );
    const cleanedUrls = response.showcaseContent.map((url) =>
      url.replace(/\\/g, '').replace(/"/g, ''),
    );
    return { showcaseContent: cleanedUrls };
  },

  // delete showcase content
  deleteShowcaseContent: async (id: string, path: string): Promise<void> => {
    const queryParams = new URLSearchParams({ path });
    await api.delete(
      `${API_ENDPOINTS.USER_PROFILE}/${id}/delete-showcase-content?${queryParams.toString()}`,
    );
  },

  setUserProfileStatus: async (id: string, status: boolean): Promise<UserProfile> => {
    const body = { profileCompleted: status };
    return await api.put(`${API_ENDPOINTS.USER_PROFILE}/${id}/set-user-profile-status`, body);
  },

  getUserProfileStatus: async (id: string): Promise<UserProfile> => {
    return await api.get(`${API_ENDPOINTS.USER_PROFILE}/${id}/get-user-profile-status`);
  },
};
