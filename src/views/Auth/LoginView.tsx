import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthSplitLayout } from '@/layouts/AuthSplitLayout';
import { CSButton } from '@/components';
import Icons from '@/assets/icons';
import logo from '@/assets/logo-title-black.svg';
import loginBackground from '@/assets/images/authentication/login-background.png';
import { useLogin } from '@/hooks/useLogin';
import { FloatingLabel } from 'flowbite-react';
interface LoginFormFields {
  email: string;
  password: string;
}

export const LoginView = function () {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(loginBackground);

  const { loginUser, isPending, isError, data } = useLogin();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormFields>({ mode: 'onChange' });

  const onSubmit = (data: LoginFormFields) => {
    const { email, password } = data;
    loginUser(
      { email, password },
      {
        onSuccess: (data) => {
          console.log('Login successful.');
          console.log(data);
          if (data.user.emailVerified) {
            navigate('/');
          } else {
            navigate(`/verify-email?email=${email}`);
          }
        },
        onError: (error) => {
          setErrorMessage(error.message);
        },
      },
    );
  };

  const [errorMessage, setErrorMessage] = useState('');

  const floatingLabelColor = () => {
    if (errorMessage) return 'error';
  };

  return (
    <>
      <AuthSplitLayout backgroundImageUrl={backgroundImageUrl}>
        <div className="w-5/6 max-w-md space-y-4 md:space-y-6 xl:max-w-full">
          <a
            href="/"
            className="mb-4 inline-flex items-center text-xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="mr-2 h-12"
              src={logo}
              alt="logo"
            />
          </a>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Welcome back!
          </h1>
          <h3 className="!mt-1.5 font-semibold text-gray-50">Opportunities await...</h3>

          <div className="items-center space-x-0 space-y-3 sm:flex sm:space-x-4 sm:space-y-0">
            <CSButton disabled className="inline-flex w-full items-center justify-center rounded-lg border border-dark bg-white px-0 py-0 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
              <Icons.FacebookIcon className="mr-2" />
              Log In with Facebook
            </CSButton>
            <CSButton disabled className="inline-flex w-full items-center justify-center rounded-lg border border-dark bg-white px-0 py-0 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
              <Icons.InstagramIcon className="mr-2" />
              Log In with Instagram
            </CSButton>
          </div>
          <div className="flex items-center">
            <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="px-5 text-center text-gray-500 dark:text-gray-400">or</div>
            <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <form
            className="max-w-full md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email
              </label>
              <FloatingLabel
                id="email"
                type="text"
                {...register('email', { required: true })}
                variant="outlined"
                label=""
                className="focus:border-2"
                helperText={errorMessage}
                color={floatingLabelColor()}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Password
              </label>
              <FloatingLabel
                id="password"
                type="password"
                {...register('password', { required: true })}
                variant="outlined"
                label=""
                className="focus:border-2"
                color={floatingLabelColor()}
              />
              <Link
                to={`/forgot-password`}
                className="mt-2 inline-block text-xs font-normal"
              >
                Forgot password?
              </Link>
            </div>
            <CSButton
              type="submit"
              disabled={!isValid}
              isProcessing={isPending}
              className="inline-flex w-full items-center justify-center rounded-lg border bg-primary px-5 py-0"
            >
              Log In
            </CSButton>
            <p className="text-sm font-light text-gray-500 dark:text-gray-300">
              Don&apos;t have an account?{' '}
              <Link
                to={`/signup`}
                className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
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
