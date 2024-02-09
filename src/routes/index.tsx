import { RouteObject, Navigate } from 'react-router-dom';
import { RequireAuth } from '@/routes/RequireAuth';
import { ThemeProvider } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import { Home } from '@/views/Home/Home';
import SignIn from '@/views/Auth/SignIn';
import Signup from '@/views/SignUp';
import { RootRoute } from '@/routes/RootRoute';
import { useTheme } from '@/hooks/useTheme';

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
      element: <Signup />,
    },
    {
      path: '/signin',
      element: <SignIn />,
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
