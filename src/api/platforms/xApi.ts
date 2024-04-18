import { axiosClient as api } from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/utils/constants';

export interface xTwitterAuthorizationResponse {
  url: string;
}

export interface xTwitterAccessTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

export const xApi = {
  authorize: async (loggedId: string): Promise<string> => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      responseType: 'text' as const,
    };
    const body = { userId: loggedId };
    return await api.post(API_ENDPOINTS.X_AUTHORIZE, body, config);
  },
};
