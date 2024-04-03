import type { RouteObject } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';
import { RequireAuth } from '@/router/RequireAuth';
import { ThemeProvider } from '@emotion/react';
import { Home } from '@/views/Home/Home';
import { LoginView } from '@/views/Auth/LoginView';
import { SignupView } from '@/views/Auth/SignupView';
import { useTheme } from '@/hooks/useTheme';
import { VerifyEmailView } from '@/views/Auth/VerifyEmailView';
import { ForgotPasswordView } from '@/views/Auth/ForgotPasswordView';
import { PasswordResetView } from '@/views/Auth/PasswordResetView';
import { EmailVerifiedView } from '@/views/Auth/EmailVerifiedView';
import { AccountSetupInstructionsView } from '@/views/Onboarding/AccountSetupInstructionsView';

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
        // {
        //   path: '/onboarding',
        //   element: <AccountSetupInstructionsView />,
        // },
        {
          path: '/',
          element: (
            <ThemeProvider theme={theme.value}>
              <Home />
            </ThemeProvider>
          ),
        },
        {
          path: '/verify-email',
          element: <VerifyEmailView />,
        },
        { path: '/email-verified', element: <EmailVerifiedView /> },
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
      path: '/onboarding',
      element: <AccountSetupInstructionsView />,
    },
  ];

  return routes;
};
