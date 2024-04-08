import { axiosClient as api } from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/utils/constants';

export interface TwitchAuthorizationResponse {
  url: string;
}

export interface TwitchAccessTokenResponse {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export interface TwitchUserInfo {
  userId: string;
  // Add more properties as per your Twitch user info model
}

export const twitchApi = {
  authorize: async (): Promise<string> => {
    return await api.get<string>(API_ENDPOINTS.TWITCH_AUTHORIZE, {
      responseType: 'text',
    });
  },

  exchangeCode: async (code: string): Promise<TwitchAccessTokenResponse> => {
    const response = await api.get<TwitchAccessTokenResponse>(
      `${API_ENDPOINTS.TWITCH_EXCHANGE_CODE}?code=${code}`,
    );
    return response;
  },

  handleAccessToken: async (accessToken: string): Promise<void> => {
    await api.post(API_ENDPOINTS.TWITCH_HANDLE_ACCESS_TOKEN, { accessToken });
  },

  connectTwitchAccount: async (email: string, code: string): Promise<string> => {
    const response = await api.post<string>(
      `${API_ENDPOINTS.TWITCH_CONNECT_ACCOUNT}?email=${email}&code=${code}`,
    );
    return response;
  },

  fetchAnalytics: async (gameId: string) => {
    const response = await api.get(`${API_ENDPOINTS.TWITCH_FETCH_ANALYTICS}?gameId=${gameId}`);
    return response;
  },

  fetchChannelAnalytics: async (channelId: string) => {
    const response = await api.get(API_ENDPOINTS.TWITCH_FETCH_CHANNEL_ANALYTICS);
    return response;
  },
};
