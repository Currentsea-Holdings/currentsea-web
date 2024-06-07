import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import type { ButtonSizes, CustomFlowbiteTheme, FlowbiteColors } from 'flowbite-react';
import classNames from 'classnames';
import { Button, getTheme } from 'flowbite-react';

import { CSSpinner } from '@/components/CSSpinner';

export type CSButtonProps<T extends ElementType = 'button'> = {
  isProcessing?: boolean;
  color?: FlowbiteColors | string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  size?: keyof ButtonSizes;
  outline?: boolean;
} & ComponentPropsWithoutRef<T>;

export const CSButton = (props: CSButtonProps) => {
  const { children, color, isProcessing, ...otherProps } = props;
  return (
    <>
      <FlowbiteButton
        isProcessing={isProcessing}
        color={color}
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
  outline,
  className,
  children,
  ...props
}: CSButtonProps) => {
  const buttonTheme: CustomFlowbiteTheme['button'] = {
    ...getTheme().button,
    color: {
      ...getTheme().button.color,
      primary: `bg-primary text-white`,
    },
    disabled: `${getTheme().button.disabled} opacity-100 !bg-gray-30 !text-white`,
    base: `${getTheme().button.base} !hover:bg-${color} rounded-lg`,
    label: `${getTheme().button.label} bg-transparent`,
    spinnerSlot: `${getTheme().button.spinnerSlot} relative h-full`,
    inner: {
      base: getTheme().button.inner.base,
      isProcessingPadding: { ...getTheme().button.inner.isProcessingPadding, md: 'p-2' },
    },
    spinnerLeftPosition: { ...getTheme().button.spinnerLeftPosition, md: 'left-0' },
    size: {
      lg: 'px-5 text-lg',
    },
  };

  return (
    <Button
      theme={buttonTheme}
      color={color}
      className={classNames(
        'items-center text-sm font-medium text-white outline-none focus:outline-none enabled:hover:opacity-90',
        { 'border border-primary bg-transparent': outline },
        className,
      )}
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
