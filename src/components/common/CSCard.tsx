import { ComponentPropsWithoutRef, ElementType, type ReactNode } from 'react';
import { Card as FlowbiteCard, CustomFlowbiteTheme } from 'flowbite-react';

type PrimaryColors = 'primary' | 'primary-light-10' | 'primary-light-20';

export type CardProps<T extends ElementType = 'div'> = {
  title?: string;
  color?: PrimaryColors;
  padding?: string;
  imgAlt?: string;
  imgSrc?: string;
  disabled?: boolean;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

const Card = ({ title, padding = 'p-4', children, ...props }: CardProps) => {
  const componentTheme: CustomFlowbiteTheme['card'] = {
    root: {
      children: `flex h-full flex-col gap-4 ${padding}`,
    },
  };

  return (
    <FlowbiteCard
      theme={componentTheme}
      className="rounded-lg bg-white h-full"
      {...props}
    >
      {title ? (
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      ) : (
        ''
      )}
      {children}
    </FlowbiteCard>
  );
};

export const CSCard = ({ children, color, imgAlt, imgSrc, ...props }: CardProps) => {
  return (
    <Card
      color={color as PrimaryColors}
      imgAlt={imgAlt}
      imgSrc={imgSrc}
      {...props}
    >
      {children}
    </Card>
  );
};
