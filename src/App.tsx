import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Routes } from '@/router/Routes';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const router = createBrowserRouter(Routes());

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={7000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
