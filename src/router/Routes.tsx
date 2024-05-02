import type { RouteObject } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';

import { UserProfileProvider } from '@/context/UserProfileContext';
import { useTheme } from '@/hooks/useTheme';
import { RequireAuth } from '@/router/RequireAuth';
import { EmailVerifiedView } from '@/views/Auth/EmailVerifiedView';
import { ForgotPasswordView } from '@/views/Auth/ForgotPasswordView';
import { LoginView } from '@/views/Auth/LoginView';
import { PasswordResetView } from '@/views/Auth/PasswordResetView';
import { SignupView } from '@/views/Auth/SignupView';
import { VerifyEmailView } from '@/views/Auth/VerifyEmailView';
import { HomeView } from '@/views/Home/HomeView';
import { OnboardingView } from '@/views/Onboarding/OnboardingView';
import { PrivacyPolicyView } from '@/views/Policies/PrivacyPolicyView';
import { TermsOfServiceView } from '@/views/Policies/TermsOfServiceView';
import { ProfileView } from '@/views/Profile/ProfileView';
import { ThemeProvider } from '@emotion/react';

export const Routes = () => {
  const { theme } = useTheme();

  const routes: RouteObject[] = [
    {
      path: '/',
      element: (
        <RequireAuth>
          <ThemeProvider theme={theme.value}>
            <UserProfileProvider>
              <Outlet />
            </UserProfileProvider>
          </ThemeProvider>
        </RequireAuth>
      ),
      children: [
        {
          path: '/',
          element: <HomeView />,
        },
        {
          path: '/profile',
          element: <ProfileView />,
        },
        {
          path: '/verify-email',
          element: <VerifyEmailView />,
        },
        {
          path: '/email-verified',
          element: <EmailVerifiedView />,
        },
        {
          path: '/onboarding',
          element: <OnboardingView />,
        },
        {
          path: '/onboarding/:step',
          element: <OnboardingView />,
        },
        {
          path: '*',
          element: (
            <Navigate
              to="/"
              replace
            />
          ),
        },
      ],
    },
    /* PUBLIC ROUTES */
    {
      path: '/signup',
      element: <SignupView />,
    },
    {
      path: '/login',
      element: <LoginView />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPasswordView />,
    },
    {
      path: '/reset-password',
      element: <PasswordResetView />,
    },
    {
      path: 'policies',
      element: (
        <ThemeProvider theme={theme.value}>
          <Outlet />
        </ThemeProvider>
      ),
      children: [
        {
          path: 'privacy',
          element: <PrivacyPolicyView />,
        },
        {
          path: 'terms',
          element: <TermsOfServiceView />,
        },
        {
          path: '*',
          element: (
            <Navigate
              to="/"
              replace
            />
          ),
        },
      ],
    },
  ];

  return routes;
};
