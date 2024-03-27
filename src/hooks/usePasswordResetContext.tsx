import { useContext } from 'react';
import { PasswordResetContext } from '@/context/PasswordResetContext';

export const usePasswordResetContext = () => {
  const context = useContext(PasswordResetContext);
  if (context === undefined) {
    throw new Error('ForgotPasswordContext is required');
  }
  return context;
};
