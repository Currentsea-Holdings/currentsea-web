import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { Dispatch, SetStateAction } from 'react';
import { AuthSplitLayout } from '@/layouts/AuthSplitLayout';
import { CSButton } from '@/components/common';
import Icons from '@/assets/icons';
import logo from '@/assets/logo-title-black.svg';
import loginBackground from '@/assets/images/authentication/login-background.png';
import { useAuthStore } from '@/stores/authStore';
import { sendPasswordResetEmail } from '@/services/authService';
import { FloatingLabel } from 'flowbite-react';
import { useMutation } from '@tanstack/react-query';

export const ForgotPasswordView = function () {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(loginBackground);
  const [isResetPasswordEmailSent, setIsResetPasswordEmailSent] = useState<boolean>(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>('');

  const user = useAuthStore((state) => state.user);
  // const isEmailVerified = user?.emailVerified;

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
          {!isResetPasswordEmailSent ? (
            <ForgotPasswordForm
              setIsResetPasswordEmailSent={setIsResetPasswordEmailSent}
              setSubmittedEmail={setSubmittedEmail}
            />
          ) : (
            <ResetPasswordEmailSent submittedEmail={submittedEmail} />
          )}
        </div>
      </AuthSplitLayout>
    </>
  );
};

const ForgotPasswordForm = ({
  setIsResetPasswordEmailSent,
  setSubmittedEmail,
}: {
  setIsResetPasswordEmailSent: Dispatch<SetStateAction<boolean>>;
  setSubmittedEmail: Dispatch<SetStateAction<string>>;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<{ email: string }>({ mode: 'onChange' });
  const [userEmail, setUserEmail] = useState('');

  const { mutate: sendEmail, isPending } = useMutation<
    unknown,
    Error,
    { email: string },
    { email: string }
  >({
    mutationFn: sendPasswordResetEmail,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  useEffect(() => {
    setIsSubmitting(isPending);
  }, [isPending]);

  const onSubmit = ({ email }: { email: string }) => {
    setUserEmail(email);
    sendEmail(
      { email },
      {
        onSuccess: (data) => {
          console.log('Email sent.');
          console.log(data);
          setIsResetPasswordEmailSent(true);
          setSubmittedEmail(email);
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
      <div className="flex">
        <Icons.LeftArrowIcon className="ml-2 mr-3 mt-1 text-dark" />
        <div className="pb-4">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Forgot Password?
          </h1>
          <h3 className="!mt-1.5 font-semibold text-gray-50">
            We’ll email you instructions to reset your password.
          </h3>
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

const ResetPasswordEmailSent = ({ submittedEmail }: { submittedEmail: string }) => {
  const navigate = useNavigate();

  const censorEmail = (email: string): string => {
    const [username, domain] = email.split('@');
    const censoredUsername = `${username[0]}${username[1]}${'*'.repeat(username.length - 1)}`;
    const domainParts = domain.split('.');
    const censoredDomain = domainParts
      .map((part, index) => {
        if (index === 0) {
          // Censoring only the part before the domain extension
          return part[0] + '*'.repeat(part.length - 1);
        }
        return part;
      })
      .join('.');

    return `${censoredUsername}@${censoredDomain}`;
  };

  return (
    <>
      <div className="flex">
        <div className="pb-4">
          <h1 className="font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Please check your email.
          </h1>
          <h3 className="!mt-1.5 font-semibold text-gray-50">
            We have sent an email to {censorEmail(submittedEmail)}. To reset your password, click on
            the link contained in that email.
          </h3>
        </div>
      </div>
      <form
        className="max-w-full md:space-y-6"
        onSubmit={() => {
          navigate('/login');
        }}
      >
        <div className="mb-4 text-center">
          Didn&apos;t receive the email? <a href="/forgot-password">Send again</a>
        </div>
        <CSButton
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-lg border bg-primary px-5 py-0"
        >
          Back to log in
        </CSButton>
      </form>
    </>
  );
};
