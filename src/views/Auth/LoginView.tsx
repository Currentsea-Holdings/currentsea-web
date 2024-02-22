import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthSplitLayout } from '@/layouts/AuthSplitLayout';
import { CSButton } from '@/components/common';
import Icons from '@/assets/icons';
import logo from '@/assets/logo-title-black.svg';
import loginBackground from '@/assets/images/authentication/login-background.png';
import { useLogin } from '@/hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
interface LoginFormFields {
  email: string;
  password: string;
}

export const LoginView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(loginBackground);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { loginUser, isPending } = useLogin();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  useEffect(() => {
    setIsSubmitting(isPending);
  }, [isPending]);

  const isSignedIn = useAuthStore((state) => state.isSignedIn());
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);

  const onSubmit = (data: LoginFormFields) => {
    const { email, password } = data;
    loginUser({ email, password });
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
            <CSButton className="inline-flex w-full items-center justify-center rounded-lg border border-dark bg-white px-0 py-0 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
              <Icons.FacebookIcon className="mr-2" />
              Log In with Facebook
            </CSButton>
            <CSButton className="inline-flex w-full items-center justify-center rounded-lg border border-dark bg-white px-0 py-0 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
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
              <input
                type="email"
                {...register('email')}
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5
                  text-sm text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700
                  dark:text-white dark:placeholder-gray-400"
                placeholder=""
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
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                {...register('password')}
                id="password"
                placeholder=""
                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5
                  text-sm text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700
                  dark:text-white dark:placeholder-gray-400"
                required={false}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <a
                href="/"
                className="mt-2 inline-block text-xs font-normal"
              >
                Forgot password?
              </a>
            </div>
            <CSButton
              type="submit"
              disabled={!email || !password}
              isProcessing={isSubmitting}
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
