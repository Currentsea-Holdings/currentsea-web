import { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import type { FormEvent, KeyboardEvent } from 'react';
import { AuthSplitLayout } from '@/layouts/AuthSplitLayout';
import { CSButton } from '@/components/common';
import Icons from '@/assets/icons';
import logo from '@/assets/logo-title-black.svg';
import loginBackground from '@/assets/images/authentication/login-background.png';
import { useRegister } from '@/hooks/useRegister';
import { useAuthStore } from '@/stores/authStore';
import {
  type ConfirmEmailPayload,
  type ConfirmEmailResponse,
  confirmEmail,
} from '@/services/authService';

type VerificationCodeFields = {
  [K in `code${number}`]: string;
};

export const VerifyEmailView = function () {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(loginBackground);

  const { registerUser, isPending } = useRegister();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  useEffect(() => {
    setIsSubmitting(isPending);
  }, [isPending]);

  const user = useAuthStore((state) => state.user);
  const isEmailVerified = user?.emailVerified;

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (typeof isLoggedIn === 'boolean' && isLoggedIn === true) {
  //     navigate('/dashboard');
  //   }
  // }, [isLoggedIn, navigate]);

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
          {isEmailVerified ? <Verified /> : <Verify />}
        </div>
      </AuthSplitLayout>
    </>
  );
};

const Verify = function () {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<VerificationCodeFields>({ mode: 'onChange' });

  const user = useAuthStore((state) => state.user);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, currentIndex: number): void => {
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      return;
    }

    const isBackspace = e.key === 'Backspace';

    if (isBackspace) {
      const currentValue = e.currentTarget.value;
      if (!currentValue) {
        e.preventDefault();
        if (currentIndex > 1) {
          const previousInputId = `code${currentIndex - 1}`;
          const previousInputElement = document.getElementById(
            previousInputId,
          ) as HTMLInputElement | null;
          if (previousInputElement) {
            previousInputElement.focus();
          }
        }
      }
    } else if (
      !/[0-9]/.test(e.key) &&
      e.key !== 'Delete' &&
      e.key !== 'Tab' &&
      e.key !== 'Escape' &&
      e.key !== 'Enter'
    ) {
      e.preventDefault();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, currentIdx: number) => {
    const nextIndex = currentIdx + 1;
    if (e.target.value.match(/^[0-9]$/)) {
      if (nextIndex <= 6) {
        const nextInputId = `code${nextIndex}`;
        (document.getElementById(nextInputId) as HTMLInputElement).focus();
      }
    } else {
      setValue(`code${currentIdx}`, '');
    }

    if (e.target.value.length > 1 && /^[0-9]+$/.test(e.target.value)) {
      const splitValues = e.target.value.split('').slice(0, 6);
      splitValues.forEach((value, index) => {
        setValue(`code${index + 1}`, value);
      });
      const nextFocusIndex = currentIdx + splitValues.length;
      const nextInputId = nextFocusIndex <= 6 ? `code${nextFocusIndex}` : `code6`;
      (document.getElementById(nextInputId) as HTMLInputElement).focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, currentIdx: number) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').trim();
    // Check for numeric keys and 6 char limit
    if (paste && /^[0-9]{1,6}$/.test(paste)) {
      const splitValues = paste.split('').slice(0, 6);
      splitValues.forEach((value, index) => {
        setValue(`code${index + 1}`, value);
      });

      const nextFocusIndex = currentIdx + splitValues.length;
      if (nextFocusIndex <= 6) {
        const nextInputId = `code${nextFocusIndex}`;
        const nextInputElement = document.getElementById(nextInputId) as HTMLInputElement | null;
        if (nextInputElement) {
          nextInputElement.focus();
        }
      }
    }
  };

  const confirmUserEmail = useAuthStore((state) => state.confirmUserEmail);
  const navigate = useNavigate();

  const onSubmit = async (data: VerificationCodeFields) => {
    const emailVerificationCode = Object.values(data).join('');
    const result: ConfirmEmailResponse | undefined = await confirmEmail({ emailVerificationCode }, { email: user?.email });
  
    if (result) {
      console.log('Email verified:', result);
      confirmUserEmail();
      // navigate('/dashboard');
    }
  };

  const inputs = [1, 2, 3, 4, 5, 6];

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
            <span className="font-medium text-gray-900 dark:text-white">{user && user.email}</span>.
            Enter the code below to confirm your email address.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4 flex justify-center space-x-2 sm:space-x-4 md:my-6">
          {inputs.map((index) => (
            <Fragment key={`fragment-${index}`}>
              <label
                htmlFor={`code${index}`}
                className="sr-only"
              >
                Verification Code Digit {index}
              </label>
              <input
                key={index}
                id={`code${index}`}
                {...register(`code${index}`, {
                  required: true,
                  maxLength: 1,
                  pattern: /^[0-9]$/,
                })}
                maxLength={1}
                onChange={(e) => {
                  handleInput(e, index);
                }}
                onKeyDown={(e) => {
                  handleKeyDown(e, index);
                }}
                onPaste={(e) => {
                  handlePaste(e, index);
                }}
                type="text"
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block h-12 w-12 rounded-lg border border-gray-300 bg-white py-3 text-center text-2xl font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:h-16 sm:w-16 sm:py-4 sm:text-4xl"
              />
            </Fragment>
          ))}
        </div>
        <p className="mb-4 p-4 text-sm text-gray-50 dark:bg-gray-800 dark:text-gray-400 md:mb-6">
          Make sure to keep this window open while checking your inbox.
        </p>
        <CSButton
          type="submit"
          disabled={!isValid}
          className="inline-flex w-full items-center justify-center rounded-lg border bg-primary px-5 py-0"
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
