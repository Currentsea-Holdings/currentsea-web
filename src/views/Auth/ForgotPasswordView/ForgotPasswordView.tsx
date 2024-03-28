import { useState } from 'react';
import { AuthSplitLayout } from '@/layouts/AuthSplitLayout';
import logo from '@/assets/logo-title-black.svg';
import loginBackground from '@/assets/images/authentication/login-background.png';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { ForgotPasswordEmailSent } from './components/ForgotPasswordEmailSent';
import { PasswordResetProvider } from '@/context/PasswordResetContext';

export const ForgotPasswordView = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(loginBackground);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>('');

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
          <PasswordResetProvider>
            {!isEmailSent ? (
              <ForgotPasswordForm
                setIsEmailSent={setIsEmailSent}
                setSubmittedEmail={setSubmittedEmail}
              />
            ) : (
              <ForgotPasswordEmailSent submittedEmail={submittedEmail} />
            )}
          </PasswordResetProvider>
        </div>
      </AuthSplitLayout>
    </>
  );
};
