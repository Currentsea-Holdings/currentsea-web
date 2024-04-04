import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthSplitLayout } from '@/layouts/AuthSplitLayout';
import { CSButton } from '@/components/common';
import logo from '@/assets/logo-title-black.svg';
import loginBackground from '@/assets/images/authentication/login-background.png';
import { useAuthStore } from '@/stores/authStore';
import { resetPassword } from '@/services/authService';
import { FloatingLabel } from 'flowbite-react';
import { useMutation } from '@tanstack/react-query';

export const PasswordResetView = function () {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(loginBackground);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') as string;

  const user = useAuthStore((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<{ password: string; confirmPassword: string }>({ mode: 'onChange' });
  const [userEmail, setUserEmail] = useState('');

  const { mutate: submitPasswordReset, isPending } = useMutation<
    unknown,
    Error,
    { token: string;
    password: string; },
    { token: string;
    password: string; }
  >({
    mutationFn: resetPassword,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  useEffect(() => {
    setIsSubmitting(isPending);
  }, [isPending]);

  const onSubmit = ({ password }: { password: string }) => {
    submitPasswordReset(
      { token, password },
      {
        onSuccess: (data) => {
          console.log('Password reset successful.');
          console.log(data);
          navigate('/login');
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
          <div className="flex">
            <div className="pb-4">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                Reset your password
              </h1>
              <h3 className="!mt-1.5 font-semibold text-gray-50">
                Your new password must be different from previous passwords.
              </h3>
            </div>
          </div>
          <form
            className="max-w-full md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* <div> */}
              {/* <input
                {...register('password', {
                  required: true,
                })}
              />
              <input
                {...register('confirmPassword', {
                  required: true,
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return 'Your passwords do no match';
                    }
                  },
                })}
              /> */}
              {/* <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                New Password
              </label>
              <FloatingLabel
                id="email"
                type="text"
                {...register('password', { required: true })}
                variant="outlined"
                label=""
                className="focus:border-2"
                helperText={errorMessage}
                color={floatingLabelColor()}
              />
            </div> */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Password
              </label>
              <FloatingLabel
                id="password"
                type="text"
                {...register('password', { required: true })}
                variant="outlined"
                label=""
                className="focus:border-2"
                color={floatingLabelColor()}
              />
            </div>
            <CSButton
              type="submit"
              disabled={!isValid}
              isProcessing={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-lg border bg-primary px-5 py-0"
            >
              Reset password
            </CSButton>
          </form>
        </div>
      </AuthSplitLayout>
    </>
  );
};
