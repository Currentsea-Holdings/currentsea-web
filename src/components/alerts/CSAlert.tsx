import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Alert, getTheme } from 'flowbite-react';
import { CheckCircle, ExclamationCircle } from 'flowbite-react-icons/solid';
import type { ComponentType } from 'react';
import { useState } from 'react';

import { CSButton } from '../CSButton';

interface CSAlertProps {
  color: 'success' | 'failure' | 'warning' | 'info' | 'gray' | 'primary';
  title: string;
  message?: string;
  buttonText?: string;
  buttonIcon?: ComponentType<{ className?: string }>;
  onButtonClick?: () => void;
}

export const CSAlert = ({
  color = 'success',
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

  const icon = color === 'success' ? CheckCircle : ExclamationCircle;

  const alertTheme: CustomFlowbiteTheme['alert'] = {
    closeButton: {
      ...getTheme().alert.closeButton,
      color: {
        ...getTheme().alert.closeButton.color,
        primary: `bg-transparent text-primary-800 hover:bg-blue-200 focus:ring-blue-400 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300`,
      },
    },
    color: {
      ...getTheme().alert.color,
      primary: `${getTheme().alert.color.blue} text-primary-800`,
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50"></div>
      <div className="relative z-10">
        <Alert
          theme={alertTheme}
          className="max-w-[632px]"
          color={color}
          icon={icon}
          onDismiss={handleClose}
          additionalContent={
            <BodyContent
              color={color}
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
  color,
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

  const buttonColor = color === 'gray' ? 'dark' : color;

  return (
    <>
      {message && <div className="mb-4 mt-2 text-lg">{message}</div>}
      <div className="flex justify-center">
        {buttonText && (
          <CSButton
            color={buttonColor}
            onClick={handleClick}
          >
            {ButtonIcon && <ButtonIcon className="mr-2 h-full w-4" />}
            {buttonText}
          </CSButton>
        )}
      </div>
    </>
  );
};
