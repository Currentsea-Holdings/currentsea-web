import { axiosClient as api } from '@/api/axiosClient';
import { API_ENDPOINTS, BASE_API_URL } from '@/utils/constants';
import { type AxiosRequestConfig } from 'axios';

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

export interface GetShowCaseContentResponse {
  showcaseContent: string[];
}

export const userProfileApi = {
  createUserProfile: async (payload: CreateUserProfilePayload): Promise<UserProfileResponse> => {
    return await api.post(API_ENDPOINTS.USER_PROFILE, payload);
  },

  updateUserProfile: async (
    id: string,
    payload: UpdateUserProfilePayload,
  ): Promise<UserProfileResponse> => {
    return await api.patch(`${API_ENDPOINTS.USER_PROFILE}/${id}`, payload);
  },

  getAllUserProfiles: async (): Promise<UserProfileResponse[]> => {
    return await api.get(API_ENDPOINTS.USER_PROFILE);
  },

  getUserProfileById: async (id: string): Promise<UserProfileResponse> => {
    return await api.get(`${API_ENDPOINTS.USER_PROFILE}/${id}`);
  },

  deleteUserProfile: async (id: string): Promise<void> => {
    await api.delete(`${API_ENDPOINTS.USER_PROFILE}/${id}`);
  },


/* USER PROFILE UPLOADING SHOWCASE CONTENT */


  // upload showcase content
  uploadShowCaseContent: async (formData: FormData): Promise<UserProfileResponse> => {
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
    // const transformedContent = cleanedUrls.map((path) => `${BASE_API_URL}${path}`);
    return { showcaseContent: cleanedUrls };
  },

  // delete showcase content
  deleteShowcaseContent: async (id: string, path: string): Promise<void> => {
    const queryParams = new URLSearchParams({ path });
    await api.delete(
      `${API_ENDPOINTS.USER_PROFILE}/${id}/delete-showcase-content?${queryParams.toString()}`,
    );
  },
};
