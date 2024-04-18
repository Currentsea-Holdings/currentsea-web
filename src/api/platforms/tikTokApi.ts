import { axiosClient as api } from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/utils/constants';
// import { codeChallenge } from '@/views/ConnectSocialMedia/api/code-challenge.ts';

export interface TikTokAuthorizationResponse {
  url: string;
}

export interface TikTokAccessTokenResponse {
  tiktokOpenId: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

export interface TikTokUserInfo {
  openId: string;
  unionId?: string;
  avatarUrl: string;
  followerCount: number;
  followingCount: number;
  likesCount: number;
}

export const tikTokApi = {
  authorize: async (loggedId: string): Promise<string> => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      responseType: 'text' as const,
    };
    const body = { userId: loggedId };
    return await api.post<string>(API_ENDPOINTS.TIKTOK_AUTHORIZE, body, config);
  },

  // authorize: async (userId: string): Promise<string> => {
  //   return await api.get<string>(`${API_ENDPOINTS.TIKTOK_AUTHORIZE}/${userId}`, {
  //     responseType: 'text',
  //   });
  // },

  // exchangeCode: async (code: string): Promise<TikTokAccessTokenResponse> => {
  //   const response = await api.get<TikTokAccessTokenResponse>(
  //     `${API_ENDPOINTS.TIKTOK_EXCHANGE_CODE}?code=${code}`,
  //   );
  //   return response;
  // },

  // handleAccessToken: async (accessToken: string): Promise<void> => {
  //   await api.post(`${API_ENDPOINTS.TIKTOK_HANDLE_ACCESS_TOKEN}`, { accessToken });
  // },

  // connectTikTokAccount: async (email: string, code: string): Promise<string> => {
  //   const response = await api.post<string>(
  //     `${API_ENDPOINTS.TIKTOK_CONNECT_ACCOUNT}?email=${email}&code=${code}`,
  //   );
  //   return response;
  // },

  getUserInfo: async (accessToken: string): Promise<TikTokUserInfo> => {
    const response = await api.get<TikTokUserInfo>(
      `${API_ENDPOINTS.TIKTOK_USER_INFO}?accessToken=${accessToken}`,
    );
    return response;
  },
};
