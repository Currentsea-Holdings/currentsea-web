/* eslint-disable jsx-a11y/anchor-is-valid */
import loginBackground from '@/assets/images/authentication/login-background.png';
import { useState, useEffect } from 'react';
import logo from '@/assets/logo-title-black.svg';
import { CSButton } from '@/components/common';
import Icons from '@/assets/icons';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthSplitLayout } from '@/layouts/AuthSplitLayout';
import { login } from '@/api/authApi';
import { useAuthStore } from '@/stores/authStore';

const SignInPage = function () {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(loginBackground);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard/home');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await login(email, password);

      // Check if login was successful
      if (response && response.status === 200) {
        // Navigate to /dashboard/home
        navigate('/dashboard/home');
      } else {
        // Handle login failure...
      }
    } catch (error) {
      // Handle error...
    }
  };

  return (
    <>
      <AuthSplitLayout backgroundImageUrl={backgroundImageUrl}>
        <div className="w-5/6 max-w-md space-y-4 md:space-y-6 xl:max-w-full">
          <a
            href="/"
            className="inline-flex items-center mb-4 text-xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="h-12 mr-2"
              src={logo}
              alt="logo"
            />
          </a>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Welcome back!
          </h1>
          <h3 className="font-semibold text-gray-50 !mt-1.5">Opportunities await...</h3>

          <div className="items-center space-x-0 space-y-3 sm:flex sm:space-x-4 sm:space-y-0">
            <CSButton className="inline-flex items-center justify-center w-full px-0 py-0 text-sm font-medium text-gray-900 bg-white border rounded-lg focus:outline-none border-dark hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              <Icons.FacebookIcon className="mr-2" />
              Log In with Facebook
            </CSButton>
            <CSButton className="inline-flex items-center justify-center w-full px-0 py-0 text-sm font-medium text-gray-900 bg-white border rounded-lg focus:outline-none border-dark hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              <Icons.InstagramIcon className="mr-2" />
              Log In with Instagram
            </CSButton>
          </div>
          <div className="flex items-center">
            <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
            <div className="px-5 text-center text-gray-500 dark:text-gray-400">or</div>
            <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <form
            className="max-w-full md:space-y-6"
            // action="#"
            onSubmit={() => handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="email@gmail.com"
                required={false}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required={false}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <a
                href="#"
                className="inline-block mt-2 text-xs font-normal"
              >
                Forgot password?
              </a>
            </div>
            {/* <button
                type="submit"
                className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-700"
                disabled={!email || !password}
              > */}
            <CSButton
              type="submit"
              disabled={!email || !password}
              className="inline-flex items-center justify-center w-full px-5 py-0 text-sm font-medium text-white border rounded-lg focus:outline-none bg-primary border-dark hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Log In
            </CSButton>
            {/* </button> */}
            <p className="text-sm font-light text-gray-500 dark:text-gray-300">
              Don&apos;t have an account?{' '}
              <Link
                to={`/signup`}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </AuthSplitLayout>
    </>
  );
};

export default SignInPage;
