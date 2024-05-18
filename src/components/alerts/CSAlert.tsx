import { Alert, Button } from 'flowbite-react';
import { CheckCircle, ExclamationCircle } from 'flowbite-react-icons/solid';
import { useState, type ComponentType } from 'react';

interface CSAlertProps {
  type: 'success' | 'failure' | 'warning' | 'info';
  title: string;
  message?: string;
  buttonText?: string;
  buttonIcon?: ComponentType<{ className?: string }>;
  onButtonClick?: () => void;
}

export const CSAlert = ({
  type = 'success',
  title,
  message,
  buttonText,
  buttonIcon,
  onButtonClick = () => {},
}: CSAlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
  };

  const icon = type === 'success' ? CheckCircle : ExclamationCircle;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50"></div>
      <div className="relative z-10">
        <Alert
          color={type}
          icon={icon}
          onDismiss={handleClose}
          additionalContent={
            <BodyContent
              type={type}
              message={message}
              buttonText={buttonText}
              buttonIcon={buttonIcon}
              onButtonClick={onButtonClick}
              onClose={handleClose}
            />
          }
        >
          <h3 className="font-semibold">{title}</h3>
        </Alert>
      </div>
    </div>
  );
};

interface BodyContentProps extends Omit<CSAlertProps, 'title'> {
  onClose: () => void;
}

const BodyContent = ({
  type,
  message,
  buttonText,
  buttonIcon: ButtonIcon,
  onButtonClick,
  onClose,
}: BodyContentProps) => {
  const handleClick = () => {
    onButtonClick?.();
    onClose();
  };

  return (
    <>
      {message && <div className="mb-4 mt-2 text-lg">{message}</div>}
      <div className="flex justify-center">
        {buttonText && (
          <Button
            color={type}
            onClick={handleClick}
          >
            {ButtonIcon && <ButtonIcon className="mr-2 h-full w-4" />}
            {buttonText}
          </Button>
        )}
      </div>
    </>
  );
};
