import type { CustomFlowbiteTheme} from 'flowbite-react';
import { Spinner, getTheme } from 'flowbite-react';

interface CSSpinnerProps {
  className?: string;
  color?: string;
};

export const CSSpinner = ({ color = 'darkblue', ...props }: CSSpinnerProps) => {
  return (
    <FlowbiteSpinner
      color={color}
      aria-label="Loading spinner"
      {...props}
    />
  );
};

const FlowbiteSpinner = ({ ...props }: CSSpinnerProps) => {
  const spinnerTheme = getTheme().spinner;
  const componentTheme: CustomFlowbiteTheme['spinner'] = { ...spinnerTheme };

  componentTheme.color = {
    darkblue: 'fill-primary-dark-20',
  };

  return (
    <Spinner
      theme={componentTheme}
      {...props}
    />
  );
};
