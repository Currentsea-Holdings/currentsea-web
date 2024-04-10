import { axiosClient as api } from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/utils/constants';

export interface SnapChatAuthorizationResponse {
  url: string;
}

export interface SnapChatAccessTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

export interface SnapChatUserInfo {
  openId: string;
  unionId?: string;
  avatarUrl: string;
  followerCount: number;
  followingCount: number;
  likesCount: number;
}

export const snapChatApi = {
  authorize: async (): Promise<string> => {
    const response = await api.get<string>(API_ENDPOINTS.SNAPCHAT_AUTHORIZE, {
      responseType: 'text',
    });
    return response;
  },
};
