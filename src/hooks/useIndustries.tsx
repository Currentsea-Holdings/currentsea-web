import { useQuery } from '@tanstack/react-query';
import { fetchAllIndustries } from '@/services/industryService';

import type { Industry } from '@/api/types';

export const useIndustries = () => {


  const { data: industries } = useQuery<Industry[]>({
    queryKey: ['industries'],
    queryFn: fetchAllIndustries,
  });

  return { industries };
};
