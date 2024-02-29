import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';
import { AuthSplitLayout } from '@/layouts/AuthSplitLayout';
import { CSButton } from '@/components/common';
import Icons from '@/assets/icons';
import logo from '@/assets/logo-title-black.svg';
import loginBackground from '@/assets/images/authentication/login-background.png';
import { useRegister } from '@/hooks/useRegister';
import { useAuthStore } from '@/stores/authStore';
interface SignUpFormFields {
  email: string;
  password: string;
}

export const SignupView = function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormFields>();
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(loginBackground);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { registerUser, isPending } = useRegister();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  useEffect(() => {
    setIsSubmitting(isPending);
  }, [isPending]);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof isLoggedIn === "boolean" && isLoggedIn === true) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);


  const onSubmit = (data: SignUpFormFields) => {
    const { email, password } = data;
    registerUser({ email, password });
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
          <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            This is not your ordinary influencer marketing platform...
          </h1>
          <h3 className="!mt-1.5 font-semibold text-gray-50">Create your account today!</h3>

          <div className="items-center space-x-0 space-y-3 sm:flex sm:space-x-4 sm:space-y-0">
            <CSButton className="inline-flex w-full items-center justify-center rounded-lg border border-dark bg-white px-0 py-0 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
              <Icons.FacebookIcon className="mr-2" />
              Sign Up with Facebook
            </CSButton>
            <CSButton className="inline-flex w-full items-center justify-center rounded-lg border border-dark bg-white px-0 py-0 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
              <Icons.InstagramIcon className="mr-2" />
              Sign Up with Instagram
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
                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
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
                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
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
              Sign Up
            </CSButton>
            <p className="text-sm font-light text-gray-500 dark:text-gray-300">
              Already have an account?{' '}
              <Link
                to={`/login`}
                className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </AuthSplitLayout>
    </>
  );
};

const Verify = function () {
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
        <Icons.LeftArrowIcon className="ml-2 mr-3 mt-1 text-dark" />
        <div className="pb-4">
          <h1 className="leding-tight col-span-11 mb-2 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
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
        <div className="my-4 flex justify-center space-x-2 sm:space-x-4 md:my-6">
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
              className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block h-12 w-12 rounded-lg border border-gray-300 bg-white py-3 text-center text-2xl font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:h-16 sm:w-16 sm:py-4 sm:text-4xl"
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
              className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block h-12 w-12 rounded-lg border border-gray-300 bg-white py-3 text-center text-2xl font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:h-16 sm:w-16 sm:py-4 sm:text-4xl"
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
              className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block h-12 w-12 rounded-lg border border-gray-300 bg-white py-3 text-center text-2xl font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:h-16 sm:w-16 sm:py-4 sm:text-4xl"
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
              className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block h-12 w-12 rounded-lg border border-gray-300 bg-white py-3 text-center text-2xl font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:h-16 sm:w-16 sm:py-4 sm:text-4xl"
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
              className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block h-12 w-12 rounded-lg border border-gray-300 bg-white py-3 text-center text-2xl font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:h-16 sm:w-16 sm:py-4 sm:text-4xl"
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
              className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block h-12 w-12 rounded-lg border border-gray-300 bg-white py-3 text-center text-2xl font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:h-16 sm:w-16 sm:py-4 sm:text-4xl"
              required
            />
          </div>
        </div>
        <p className="mb-4 p-4 text-sm text-gray-50 dark:bg-gray-800 dark:text-gray-400 md:mb-6">
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

const Verified = function () {
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
        <Icons.LeftArrowIcon className="ml-2 mr-3 mt-1 text-dark" />
        <div className="pb-4">
          <h1 className="leding-tight col-span-11 mb-2 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Email has been verified!
          </h1>
          <p className="mb-36 text-gray-500 dark:text-gray-400">
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
