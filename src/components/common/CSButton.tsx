import { ComponentPropsWithoutRef, ElementType, type ReactNode } from 'react';
import { Button as FlowbiteButton } from 'flowbite-react';

type PrimaryColors = 'primary' | 'primary-light-10' | 'primary-light-20';

export type ButtonProps<T extends ElementType = 'button'> = {
  color?: PrimaryColors;
  disabled?: boolean;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

const Button = ({ color = 'primary', disabled, children, ...props }: ButtonProps) => {
  return (
    <FlowbiteButton
      className={`bg-${color} text-offwhite rounded enabled:hover:bg-${color} hover:opacity-90`}
      {...props}
      disabled={disabled}
    >
      {children}
    </FlowbiteButton>
  );
};

export const CSButton = (props: ButtonProps) => {
  const { children, color, ...otherProps } = props;
  return (
    <Button
      color={color as PrimaryColors}
      {...otherProps}
    >
      {children}
    </Button>
  );
};
