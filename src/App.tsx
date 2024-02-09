import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Routes } from '@/routes';

const App: React.FC = () => {
  const router = createBrowserRouter(Routes());

  return <RouterProvider router={router} />;
};

export default App;
