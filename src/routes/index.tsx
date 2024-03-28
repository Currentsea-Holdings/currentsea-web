import type { RouteObject} from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';
import { RequireAuth } from '@/routes/RequireAuth';
import { ThemeProvider } from '@emotion/react';
import { Home } from '@/views/Home/Home';
import { LoginView } from '@/views/Auth/LoginView';
import { SignupView } from '@/views/Auth/SignupView';
import { RootRoute } from '@/routes/RootRoute';
import { useTheme } from '@/hooks/useTheme';
import type { ReactNode } from 'react';
import { VerifyEmailView } from '@/views/Auth/VerifyEmailView';
import { ForgotPasswordView } from '@/views/Auth/ForgotPasswordView';
import { PasswordResetView } from '@/views/Auth/PasswordResetView';
import { EmailVerifiedView } from '@/views/Auth/EmailVerifiedView';

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
      path: '/email-verified',
      element: <EmailVerifiedView />,
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
      element: <h1>Account Setup</h1>,
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
