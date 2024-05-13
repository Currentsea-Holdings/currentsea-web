import { axiosClient as api } from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/utils/constants';

import type { Industry } from './types';

export const industryApi = {
  getAllIndustries: async (): Promise<Industry[]> => {
    return await api.get(API_ENDPOINTS.INDUSTRIES);
  }
};