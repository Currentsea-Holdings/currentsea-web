import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';

interface Props {
  children: ReactNode;
}

const useRedirectInfo = () => {
  const location = useLocation();
  const { user, userProfile } = useAuthStore();

  if (!user) {
    return { shouldRedirect: true, redirectTo: '/login' };
  }

  const pathsRestrictedForVerifiedUsers = ['/verify-email', '/email-verified'];
  if (
    user.emailVerified &&
    user.userType &&
    pathsRestrictedForVerifiedUsers.includes(location.pathname)
  ) {
    return { shouldRedirect: true, redirectTo: '/' };
  }

  if (!user.emailVerified) {
    const isOnVerifyEmailPage = location.pathname === '/verify-email';
    return { shouldRedirect: !isOnVerifyEmailPage, redirectTo: '/verify-email' };
  }

  if (!user.userType && location.pathname !== '/email-verified') {
    return { shouldRedirect: true, redirectTo: '/email-verified' };
  }

  if (!userProfile) {
    const pathsRequiringProfile = ['/', '/onboarding/2', '/onboarding/3'];
    if (pathsRequiringProfile.includes(location.pathname)) {
      return { shouldRedirect: true, redirectTo: '/onboarding' };
    }
  }

  return { shouldRedirect: false };
};

export const RequireAuth = ({ children }: Props) => {
  const { shouldRedirect, redirectTo } = useRedirectInfo();
  const location = useLocation();

  if (shouldRedirect) {
    return (
      <Navigate
        to={redirectTo || '/'}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};
