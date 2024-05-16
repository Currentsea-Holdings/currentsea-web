import { Alert, Button } from 'flowbite-react';

interface CSAlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const CSAlert = ({
  type,
  title,
  description,
  buttonText,
  onButtonClick = () => {},
}: CSAlertProps) => {
  return (
    <Alert color={type}>
      <div>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>
      {buttonText && (
        <Button
          color="blue"
          onClick={onButtonClick} 
        >
          {buttonText}
        </Button>
      )}
    </Alert>
  );
};
