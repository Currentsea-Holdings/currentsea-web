import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import type { ButtonSizes, CustomFlowbiteTheme } from 'flowbite-react';
import classNames from 'classnames';
import { Button, getTheme } from 'flowbite-react';
import { HiPlus } from 'react-icons/hi';

type PrimaryColors = 'primary' | 'primary-light-10' | 'primary-light-20';

export type ButtonAddProps<T extends ElementType = 'button'> = {
  isProcessing?: boolean;
  color?: PrimaryColors;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  size?: keyof ButtonSizes;
  outline?: boolean;
} & ComponentPropsWithoutRef<T>;

export const ButtonAdd = (props: ButtonAddProps) => {
  const { children, color, isProcessing, ...otherProps } = props;
  return (
    <>
      <FlowbiteButton
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
  outline,
  className,
  children,
  size,
  ...props
}: ButtonAddProps) => {
  const buttonTheme: CustomFlowbiteTheme['button'] = getTheme().button;

  const componentTheme: CustomFlowbiteTheme['button'] = {
    ...buttonTheme,
    base: `${buttonTheme.base} bg-primary hover:opacity-90`,
    size: {
      xs: 'p-0.5 text-sm',
      sm: 'p-2 text-sm',
      md: 'p-4 text-sm',
      lg: 'p-5 text-base',
      xl: 'p-6 text-base',
    },
  };

  return (
    <Button
      theme={componentTheme}
      color={color}
      size={size}
      pill={true}
      className={classNames('border-radius flex items-center justify-center text-white', className)}
      {...props}
      disabled={disabled}
    >
      <HiPlus
        className={classNames({
          'h-8 w-8': size === 'lg',
          'h-6 w-6': size === 'sm',
          'h-5 w-5': size === 'xs',
        })}
      />
    </Button>
  );
};
