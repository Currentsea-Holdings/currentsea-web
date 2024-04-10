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
  authorize: async (): Promise<string> => {
    const response = await api.get<string>(API_ENDPOINTS.X_AUTHORIZE, {
      responseType: 'text',
    });
    return response;
  },
};