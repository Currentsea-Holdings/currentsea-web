import type { ComponentPropsWithoutRef, ElementType, ReactNode} from 'react';
import type { CustomFlowbiteTheme} from 'flowbite-react';
import { getTheme, Button } from 'flowbite-react';
import { CSSpinner } from '@/components/common/CSSpinner';

type PrimaryColors = 'primary' | 'primary-light-10' | 'primary-light-20';

export type CSButtonProps<T extends ElementType = 'button'> = {
  isProcessing?: boolean;
  color?: PrimaryColors;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export const CSButton = (props: CSButtonProps) => {
  const { children, color, isProcessing, ...otherProps } = props;
  return (
    <>
      <FlowbiteButton
        isProcessing={isProcessing}
        color={color as PrimaryColors}
        {...otherProps}
      >
        {isProcessing ? null : children}
      </FlowbiteButton>
    </>
  );
};

const FlowbiteButton = ({
  color = 'primary',
  isProcessing,
  disabled,
  className,
  children,
  ...props
}: CSButtonProps) => {
  const buttonTheme: CustomFlowbiteTheme['button'] = getTheme().button;

  const componentTheme: CustomFlowbiteTheme['button'] = {
    ...buttonTheme,
    disabled: `${buttonTheme.disabled} opacity-100 !bg-gray-30 !text-white`,
    base: `${buttonTheme.base} !hover:bg-${color}`,
    label: `${buttonTheme.label} bg-transparent`,
    spinnerSlot: `${buttonTheme.spinnerSlot} relative h-full`,
    inner: {
      ...buttonTheme.inner,
      base: `${buttonTheme.inner?.base} max-h-9`,
      isProcessingPadding: { ...buttonTheme.inner?.isProcessingPadding, md: 'p-2' },
    },
    spinnerLeftPosition: { ...buttonTheme.spinnerLeftPosition, md: 'left-0' },
  };

  return (
    <Button
      theme={componentTheme}
      color="primary"
      className={`rounded text-sm font-medium text-white outline-none focus:outline-none enabled:hover:opacity-90 ${className}`}
      {...props}
      disabled={disabled}
      isProcessing={isProcessing}
      processingLabel=""
      processingSpinner={
        <CSSpinner
          className="h-full"
          aria-label="Loading spinner"
        />
      }
    >
      {isProcessing ? <div className="inline-block h-4"></div> : children}
    </Button>
  );
};
