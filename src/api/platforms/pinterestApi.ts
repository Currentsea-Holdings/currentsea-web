import { axiosClient as api } from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/utils/constants';

export const pinterestApi = {
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
    return await api.post<string>(API_ENDPOINTS.PINTEREST_AUTHORIZE, body, config);
  },
};
