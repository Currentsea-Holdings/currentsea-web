import type { RouteObject } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';
import { RequireAuth } from '@/router/RequireAuth';
import { ThemeProvider } from '@emotion/react';
import { HomeView } from '@/views/Home/HomeView';
import { LoginView } from '@/views/Auth/LoginView';
import { SignupView } from '@/views/Auth/SignupView';
import { useTheme } from '@/hooks/useTheme';
import { VerifyEmailView } from '@/views/Auth/VerifyEmailView';
import { ForgotPasswordView } from '@/views/Auth/ForgotPasswordView';
import { PasswordResetView } from '@/views/Auth/PasswordResetView';
import { EmailVerifiedView } from '@/views/Auth/EmailVerifiedView';
import { OnboardingView } from '@/views/Onboarding/OnboardingView';
import { TermsOfServiceView } from '@/views/Policies/TermsOfServiceView';
import { PrivacyPolicyView } from '@/views/Policies/PrivacyPolicyView';
import ProfileCreationSteps from '@/views/Home/UserProfileSetup/ProfileCreationSteps';
import { UserProfileProvider } from '@/context/UserProfileContext';

export const Routes = () => {
  const { theme } = useTheme();

  const routes: RouteObject[] = [
    {
      path: '/',
      element: (
        <RequireAuth>
          <Outlet />
        </RequireAuth>
      ),
      children: [
        {
          path: '/',
          element: (
            <ThemeProvider theme={theme.value}>
              <UserProfileProvider>
                <HomeView />
              </UserProfileProvider>
            </ThemeProvider>
          ),
        },
        {
          path: '/verify-email',
          element: <VerifyEmailView />,
        },
        { path: '/email-verified', element: <EmailVerifiedView /> },
        {
          path: '/onboarding',
          element: <OnboardingView />,
        },
        {
          path: '/onboarding/:step',
          element: <OnboardingView />,
        },
        {
          path: 'create-user-profile/:step',
          element: (
            <UserProfileProvider>
              <ProfileCreationSteps />
            </UserProfileProvider>
          ),
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
