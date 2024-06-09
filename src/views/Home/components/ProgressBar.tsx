import type { CustomFlowbiteTheme } from 'flowbite-react';
import { getTheme, Progress } from 'flowbite-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  return (
    <Progress
      theme={progressTheme}
      progress={((currentStep + 1) / totalSteps) * 100}
      size="sm"
      color="blue"
    />
  );
};

const progressTheme: CustomFlowbiteTheme['progress'] = {
  ...getTheme().progress,
  base: `${getTheme().progress.base} rounded-none`,
  bar: `${getTheme().progress.bar} rounded-none`,
};
