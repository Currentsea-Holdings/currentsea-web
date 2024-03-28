import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CSButton } from '@/components/common';
import { FloatingLabel } from 'flowbite-react';
import { usePasswordResetContext } from '@/hooks/usePasswordResetContext';
import { GoBackButton } from '../../components/GoBackButton';

export const ForgotPasswordForm = ({
  setIsEmailSent,
  setSubmittedEmail,
}: {
  setIsEmailSent: Dispatch<SetStateAction<boolean>>;
  setSubmittedEmail: Dispatch<SetStateAction<string>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ email: string }>({ mode: 'onChange' });

  const { sendResetPassEmail, isPending } = usePasswordResetContext();

  const onSubmit = ({ email }: { email: string }) => {
    sendResetPassEmail(
      { email },
      {
        onSuccess: (data) => {
          console.log('Email sent.');
          console.log(data);
          setIsEmailSent(true);
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
        <GoBackButton />
        <div className="pb-4">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Forgot Password?
          </h1>
          <h3 className="!mt-1.5 font-semibold text-gray-50">
            We&apos;ll email you instructions to reset your password.
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
          isProcessing={isPending}
          className="inline-flex w-full items-center justify-center rounded-lg border bg-primary px-5 py-0"
        >
          Send Email
        </CSButton>
      </form>
    </>
  );
};
