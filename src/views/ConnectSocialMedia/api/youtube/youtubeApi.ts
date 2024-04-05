import { axiosClient as api } from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/utils/constants';

export interface YouTubeAuthorizationResponse {
  url: string;
}

export interface YouTubeAccessTokenResponse {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export interface YouTubeUserInfo {
  userId: string;
}

export const youtubeApi = {
  authorize: async (): Promise<string> => {
    const response = await api.get<string>(API_ENDPOINTS.YOUTUBE_AUTHORIZE, {
      responseType: 'text',
    });
    return response;
  },

  exchangeCode: async (code: string): Promise<YouTubeAccessTokenResponse> => {
    const response = await api.get<YouTubeAccessTokenResponse>(
      `${API_ENDPOINTS.YOUTUBE_EXCHANGE_CODE}?code=${code}`,
    );
    return response;
  },

  handleAccessToken: async (accessToken: string): Promise<void> => {
    await api.post(API_ENDPOINTS.YOUTUBE_HANDLE_ACCESS_TOKEN, { accessToken });
  },

  connectYoutubeAccount: async (email: string, code: string): Promise<string> => {
    const response = await api.post<string>(
      `${API_ENDPOINTS.YOUTUBE_CONNECT_ACCOUNT}?email=${email}&code=${code}`,
    );
    return response;
  },

  fetchAnalytics: async (channelId: string) => {
    const response = await api.get(
      `${API_ENDPOINTS.YOUTUBE_FETCH_ANALYTICS}?channelId=${channelId}`,
    );
    return response;
  },

  // fetchChannelData: async (): > => {
  //   const response = await api.get(`${API_ENDPOINTS.YOUTUBE_FETCH_CHANNEL_ANALYTICS}`);
  //   return response;
  // },
};
