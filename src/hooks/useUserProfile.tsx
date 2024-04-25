import { useContext } from 'react';
import { UserProfileContext } from '@/context/UserProfileContext';

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  return context;
};