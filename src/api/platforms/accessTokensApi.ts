import { axiosClient as api } from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/utils/constants';

export interface ConnectedAccessTokenTypes {
  [key: string]: boolean;
  tiktok: boolean;
  youtube: boolean;
  twitch: boolean;
  facebook: boolean;
  instagram: boolean;
  linkedin: boolean;
  pinterest: boolean;
  snapchat: boolean;
  x: boolean;
  paypal: boolean;
}

export const accessTokensApi = {
  getConnectedAccessTokens: async (loggedId: string): Promise<ConnectedAccessTokenTypes> => {
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
    return await api.post<ConnectedAccessTokenTypes>(API_ENDPOINTS.ALL_ACCESS_TOKENS, body, config);
  },
};
