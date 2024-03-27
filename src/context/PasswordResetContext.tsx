import type { ReactNode } from 'react';
import { createContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sendPasswordResetEmail } from '@/services/authService';

interface PasswordResetContext {
  sendResetPassEmail: (
    args: { email: string },
    options?: {
      onSuccess?: (data: unknown) => void;
      onError?: (error: Error) => void;
    },
  ) => void;
  isPending: boolean;
}

export const PasswordResetContext = createContext<PasswordResetContext | undefined>(undefined);

export const PasswordResetProvider = ({ children }: { children: ReactNode }) => {
  const { mutate: sendResetPassEmail, isPending } = useMutation<unknown, Error, { email: string }>({
    mutationFn: sendPasswordResetEmail,
  });

  return (
    <PasswordResetContext.Provider value={{ sendResetPassEmail, isPending }}>
      {children}
    </PasswordResetContext.Provider>
  );
};
