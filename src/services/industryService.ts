import { isAxiosError } from 'axios';

import { industryApi } from '@/api/industryApi';
import { ERROR_MESSAGES } from '@/utils/constants';

import type { Industry } from '@/api/types';

export const fetchAllIndustries = async (): Promise<Industry[]> => {
  try {
    return await industryApi.getAllIndustries();
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(ERROR_MESSAGES.GENERAL_ERROR);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

