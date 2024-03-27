import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Routes } from '@/routes';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const router = createBrowserRouter(Routes());

  return (
    <>
      <RouterProvider router={router} />;
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
