import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Card } from 'flowbite-react';

type PrimaryColors = 'primary' | 'primary-light-10' | 'primary-light-20';

export type CSCardProps<T extends ElementType = 'div'> = {
  title?: string;
  color?: PrimaryColors;
  padding?: string;
  imgAlt?: string;
  imgSrc?: string;
  disabled?: boolean;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export const CSCard = ({ children, color, imgAlt, imgSrc, ...props }: CSCardProps) => {
  return (
    <FlowbiteCard
      color={color as PrimaryColors}
      imgAlt={imgAlt}
      imgSrc={imgSrc}
      {...props}
    >
      {children}
    </FlowbiteCard>
  );
};

const FlowbiteCard = ({ title, padding = 'p-4', children, ...props }: CSCardProps) => {
  const componentTheme: CustomFlowbiteTheme['card'] = {
    root: {
      children: `flex h-full flex-col gap-4 ${padding}`,
    },
  };

  return (
    <Card
      theme={componentTheme}
      className="h-full rounded-lg bg-white"
      {...props}
    >
      {title ? (
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      ) : (
        ''
      )}
      {children}
    </Card>
  );
};
