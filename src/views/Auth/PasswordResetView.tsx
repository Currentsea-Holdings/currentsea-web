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
  sendPasswordResetEmail,
} from '@/services/authService';
import { FloatingLabel } from 'flowbite-react';
import { useMutation } from '@tanstack/react-query';

interface ResetPasswordFields {
  password: string;
  confirmPassword: string;
}

export const PasswordResetView = function () {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(loginBackground);

  const user = useAuthStore((state) => state.user);
  const isEmailVerified = user?.emailVerified;

  const navigate = useNavigate();

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
          {isEmailVerified ? <Verify /> : <Verify />}
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
  } = useForm<{ email: string }>({ mode: 'onChange' });

  const user = useAuthStore((state) => state.user);

  // const { registerUser, isPending } = useRegister();
  const { mutate: sendEmail, isSuccess, isPending, data, isError, error } = useMutation<
    unknown,
    Error,
    {email: string},
    {email: string}
  >({
    mutationFn: sendPasswordResetEmail,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  useEffect(() => {
    setIsSubmitting(isPending);
  }, [isPending]);


  const onSubmit = ({ email }: { email: string }) => {

  sendEmail(
      { email },
      {
        onSuccess: (data) => {
          console.log('Email sent.');
          console.log(data);
          // if (data.user.emailVerified) {
          //   setUser(data.user);
          //   navigate('/dashboard');
          // } else {
          //   navigate(`/verify-email?email=${email}`);
          // }
        },
        onError: (error) => {
          setErrorMessage(error.message);
        },
      })
    // loginUser(
    //   { email, password },
    //   {
    //     onSuccess: (data) => {
    //       console.log('Login successful.');
    //       console.log(data);
    //       if (data.user.emailVerified) {
    //         setUser(data.user);
    //         navigate('/dashboard');
    //       } else {
    //         navigate(`/verify-email?email=${email}`);
    //       }
    //     },
    //     onError: (error) => {
    //       setErrorMessage(error.message);
    //     },
    //   },
    // );
  };

  // const onSubmit = async (data: VerificationCodeFields) => {
  //   const emailVerificationCode = Object.values(data).join('');
  //   const result: ConfirmEmailResponse | undefined = await confirmEmail(
  //     { emailVerificationCode },
  //     { email: user?.email },
  //   );

  //   if (result) {
  //     console.log('Email verified:', result);
  //     confirmUserEmail();
  //     // navigate('/dashboard');
  //   }
  // };

  const [errorMessage, setErrorMessage] = useState('');

  const floatingLabelColor = () => {
    if (errorMessage) return 'error';
  };

  return (
    <>
      <div className="flex">
        <Icons.LeftArrowIcon className="ml-2 mr-3 mt-1 text-dark" />
        <div className="pb-4">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Forgot Password?
          </h1>
          <h3 className="!mt-1.5 font-semibold text-gray-50">We’ll email you instructions to reset your password.</h3>
        </div>
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
        <CSButton
          type="submit"
          disabled={!isValid}
          isProcessing={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-lg border bg-primary px-5 py-0"
        >
          Send Email
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
