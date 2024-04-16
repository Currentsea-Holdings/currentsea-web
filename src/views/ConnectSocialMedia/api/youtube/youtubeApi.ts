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
  authorize: async (loggedId: string): Promise<string> => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      responseType: 'text' as const,
    };
    const body = {
      userId: loggedId,
    };
    return await api.post<string>(API_ENDPOINTS.YOUTUBE_AUTHORIZE, body, config);
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
