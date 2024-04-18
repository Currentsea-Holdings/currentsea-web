import { axiosClient as api } from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/utils/constants';

interface PaypalOnboardingResponse {
  success: boolean;
  message: string;
}

export const paypalApi = {
  getAuthUrl: async (loggedId: string): Promise<string> => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      responseType: 'text' as const,
    };
    const body = { userId: loggedId };

    try {
      return await api.post<string>(API_ENDPOINTS.PAYPAL_AUTHORIZE, body, config);
    } catch (error) {
      throw new Error('Failed to onboard PayPal');
    }
  },
};
