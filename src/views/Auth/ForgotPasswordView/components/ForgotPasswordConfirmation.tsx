import { CSButton } from '@/components';
import { useToast } from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { usePasswordResetContext } from '@/hooks/usePasswordResetContext';

export const ForgotPasswordConfirmation = ({ submittedEmail }: { submittedEmail: string }) => {
    const showToast = useToast();
    const navigate = useNavigate();
    const { sendResetPassEmail } = usePasswordResetContext();
  
    const handleResendResetPassEmail = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
  
      sendResetPassEmail(
        { email: submittedEmail },
        {
          onSuccess: (data) => {
            showToast();
          },
          onError: (error) => {
            // setErrorMessage(error.message);
          },
        },
      );
    };
  
    return (
      <>
        <div className="flex">
          <div className="pb-4">
            <h1 className="font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Please check your email.
            </h1>
            <h3 className="!mt-1.5 font-semibold text-gray-50">
              We have sent an email to {submittedEmail}. To reset your password, click on
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
            Didn&apos;t receive the email?{' '}
            <button
              type="button"
              onClick={handleResendResetPassEmail}
              className="font-inherit cursor-pointer border-none bg-transparent p-0 text-primary hover:text-[#535bf2]"
            >
              Send again
            </button>
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
  