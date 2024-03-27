import type React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: Props) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const location = useLocation();

  if (typeof isLoggedIn === "boolean" && isLoggedIn === true) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
};
