import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<Props> = ({ children }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn as boolean);
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/signin"
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
};
