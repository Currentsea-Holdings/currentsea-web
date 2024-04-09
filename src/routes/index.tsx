import { useTheme } from '@/hooks/useTheme';
import { RequireAuth } from '@/routes/RequireAuth';
import { RootRoute } from '@/routes/RootRoute';
import { AccountSetupInstructionsView } from '@/views/AccountSetup/AccountSetupInstructionsView';
import { ConnectSocialMediaView } from '@/views/AccountSetup/ConnectSocialMediaView';
import EarningsSetupView from '@/views/AccountSetup/EarningsSetupView';
import { ForgotPasswordView } from '@/views/Auth/ForgotPasswordView';
import { LoginView } from '@/views/Auth/LoginView';
import { PasswordResetView } from '@/views/Auth/PasswordResetView';
import { SignupView } from '@/views/Auth/SignupView';
import { VerifyEmailView } from '@/views/Auth/VerifyEmailView';
import { Home } from '@/views/Home/Home';
import LoadingScreenView from '@/views/LoadingScreen/LoadingScreenView';
import { ThemeProvider } from '@emotion/react';
import type { ReactNode } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  user: { id: string; email: string } | null;
  children: ReactNode;
}
const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


export const Routes = () => {
  const { theme } = useTheme();

  const routes: RouteObject[] = [
    {
      path: '/',
      element: <RootRoute />,
      // loader: rootLoader,
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
      path: '/verify-email',
      element: <VerifyEmailView />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPasswordView />,
    },
    {
      path: '/reset-password',
      element: <PasswordResetView />,
    },
    //AccountSetupInstructions
    {
      path: '/account-setup-instructions',
      element: <AccountSetupInstructionsView />
    },
    //ConnectSocialMediaPage
    {
      path: '/connect-social-media',
      element: <ConnectSocialMediaView />
    },
    {
      path: '/earnings-setup',
      element: <EarningsSetupView />
    },
    {
      path: '/loading-screen',
      element: <LoadingScreenView />
    },
    {
      path: '/dashboard/*',
      element: (
        <RequireAuth>
          <ThemeProvider theme={theme.value}>
            <Outlet />
          </ThemeProvider>
        </RequireAuth>
      ),
      children: [
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: '*',
          element: (
            <RequireAuth>
              <Navigate to="/dashboard/home" />
            </RequireAuth>
          ),
          // errorElement: <></>,
        },
      ],
    },
  ];

  return routes;
};
