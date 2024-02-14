/* eslint-disable jsx-a11y/anchor-is-valid */
import { TextInput } from 'flowbite-react';
import loginBackground from '@/assets/images/authentication/login-background.png';
import { useState } from 'react';
import logo from '@/assets/logo-title-black.svg';
import { CSButton } from '@/components/common';
import Icons from '@/assets/icons';
import type { FC, FormEvent } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AuthSplitLayout } from '@/layouts/AuthSplitLayout';

const SignInPage: FC = function () {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(loginBackground);

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
          <SignUp />
        </div>
      </AuthSplitLayout>
    </>
  );
};

export default SignInPage;

const Verify: FC = function () {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };
  return (
    <>
      <div className="flex">
        <Icons.LeftArrowIcon className="mt-1 ml-2 mr-3 text-dark" />
        <div className="pb-4">
          <h1 className="col-span-11 mb-2 text-2xl font-extrabold tracking-tight text-gray-900 leding-tight dark:text-white">
            Verify your email address.
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            We emailed you a six-digit code to&nbsp;
            <span className="font-medium text-gray-900 dark:text-white">email@gmail.com</span>.
            Enter the code below to confirm your email address.
          </p>
        </div>
      </div>
      <form action="#">
        <div className="flex justify-center my-4 space-x-2 sm:space-x-4 md:my-6">
          <div>
            <label
              htmlFor="code-1"
              className="sr-only"
            >
              First code
            </label>
            <input
              id="code-1"
              maxLength={1}
              onKeyUp={() => {
                (document.querySelector('#code-2') as HTMLInputElement).focus();
              }}
              required
              type="text"
              className="block w-12 h-12 py-3 text-2xl font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg sm:py-4 sm:text-4xl sm:w-16 sm:h-16 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div>
            <label
              htmlFor="code-2"
              className="sr-only"
            >
              Second code
            </label>
            <input
              id="code-2"
              maxLength={1}
              onKeyUp={() => {
                (document.querySelector('#code-3') as HTMLInputElement).focus();
              }}
              type="text"
              required
              className="block w-12 h-12 py-3 text-2xl font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg sm:py-4 sm:text-4xl sm:w-16 sm:h-16 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div>
            <label
              htmlFor="code-3"
              className="sr-only"
            >
              Third code
            </label>
            <input
              type="text"
              maxLength={1}
              id="code-3"
              onKeyUp={() => {
                (document.querySelector('#code-4') as HTMLInputElement).focus();
              }}
              className="block w-12 h-12 py-3 text-2xl font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg sm:py-4 sm:text-4xl sm:w-16 sm:h-16 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="code-4"
              className="sr-only"
            >
              Fourth code
            </label>
            <input
              id="code-4"
              maxLength={1}
              onKeyUp={() => {
                (document.querySelector('#code-5') as HTMLInputElement).focus();
              }}
              required
              type="text"
              className="block w-12 h-12 py-3 text-2xl font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg sm:py-4 sm:text-4xl sm:w-16 sm:h-16 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div>
            <label
              htmlFor="code-5"
              className="sr-only"
            >
              Fifth code
            </label>
            <input
              id="code-5"
              maxLength={1}
              onKeyUp={() => {
                (document.querySelector('#code-6') as HTMLInputElement).focus();
              }}
              required
              type="text"
              className="block w-12 h-12 py-3 text-2xl font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg sm:py-4 sm:text-4xl sm:w-16 sm:h-16 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div>
            <label
              htmlFor="code-6"
              className="sr-only"
            >
              Sixth code
            </label>
            <input
              type="text"
              maxLength={1}
              id="code-6"
              className="block w-12 h-12 py-3 text-2xl font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg sm:py-4 sm:text-4xl sm:w-16 sm:h-16 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
        </div>
        <p className="p-4 mb-4 text-sm text-gray-50 dark:text-gray-400 md:mb-6 dark:bg-gray-800">
          Make sure to keep this window open while checking your inbox.
        </p>
        <CSButton
          type="submit"
          className="w-full"
        >
          Verify
        </CSButton>
      </form>
    </>
  );
};

const Verified: FC = function () {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };
  return (
    <>
      <div className="flex">
        <Icons.LeftArrowIcon className="mt-1 ml-2 mr-3 text-dark" />
        <div className="pb-4">
          <h1 className="col-span-11 mb-2 text-2xl font-extrabold tracking-tight text-gray-900 leding-tight dark:text-white">
            Email has been verified!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-36">
            Finish your account setup to start discovering exclusive opportunities.
          </p>
        </div>
      </div>
      <form action="#">
        <CSButton
          type="submit"
          className="w-full"
        >
          Set Up Account
        </CSButton>
      </form>
    </>
  );
};

const SignUp: FC = function () {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
        This is not your ordinary influencer marketing platform...
      </h1>
      <h3 className="font-semibold text-gray-50 !mt-1.5">Create your account today!</h3>

      <div className="items-center space-x-0 space-y-3 sm:flex sm:space-x-4 sm:space-y-0">
        <CSButton className="inline-flex items-center justify-center w-full px-0 py-0 text-sm font-medium text-gray-900 bg-white border rounded-lg focus:outline-none border-dark hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          <Icons.FacebookIcon className="mr-2" />
          Sign Up with Facebook
        </CSButton>
        <CSButton className="inline-flex items-center justify-center w-full px-0 py-0 text-sm font-medium text-gray-900 bg-white border rounded-lg focus:outline-none border-dark hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          <Icons.InstagramIcon className="mr-2" />
          Sign Up with Instagram
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
        onSubmit={handleSubmit}
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
          Sign Up
        </CSButton>
        {/* </button> */}
        <p className="text-sm font-light text-gray-500 dark:text-gray-300">
          Already have an account?{' '}
          <a
            href="#"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            <Link to={`/login`}>Log In</Link>
          </a>
        </p>
      </form>
    </>
  );
};
