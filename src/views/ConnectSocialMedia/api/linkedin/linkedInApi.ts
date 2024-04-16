import { axiosClient as api } from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/utils/constants';

export const linkedInApi = {
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
    const response = await api.post<string>(API_ENDPOINTS.LINKEDIN_AUTHORIZE, body, config);
    return response;
  },
};
