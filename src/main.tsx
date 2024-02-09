import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Root, { loader as rootLoader, action as rootAction } from './routes/root';
import ErrorPage from "./error-page";
import Contact from "./routes/contact";
import { Home } from './views/Home/Home.tsx';
import { AuthProvider } from '@/context/AuthContext';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     // loader: rootLoader,
//     children: [
//       {
//         path: '/team',
//         element: <h1>Hello!</h1>,
//         // loader: teamLoader,
//       },
//     ],
//   },
// ]);



const rootElement: HTMLElement | null = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* <RouterProvider router={router} /> */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>,
  );
}
