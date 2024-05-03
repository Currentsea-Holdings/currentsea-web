import type { ComponentPropsWithoutRef, ElementType, FC, ReactNode, ReactElement } from 'react';
import { Card as FlowbiteCard } from 'flowbite-react';

import type { CustomFlowbiteTheme } from 'flowbite-react';
import type { IconProps } from '@/assets/icons';

type PrimaryColors = 'primary' | 'primary-light-10' | 'primary-light-20';

export type CardProps<T extends ElementType = 'div'> = {
  amount: string;
  label: string;
  icon?: FC<IconProps>;
  iconComponent?: ReactElement;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

const componentTheme: CustomFlowbiteTheme['card'] = {
  root: {
    children: 'flex h-full flex items-center justify-center gap-4 py-3 px-5',
  },
};

const Card = ({ amount, label, icon, iconComponent: IconComponent, children, ...props }: CardProps) => {
  return (
    <>
      <FlowbiteCard
        theme={componentTheme}
        className="rounded-lg"
        {...props}
      >
        {children}
        <div className="IconShapes flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100">
          {icon && icon({ className: 'text-primary'})}
          {IconComponent && IconComponent}
        </div>
        <div className="HeadingDescription inline-flex shrink grow basis-0 flex-col items-start justify-start gap-1">
          <div className="self-stretch text-3xl font-bold leading-9 text-gray-900">{amount}</div>
          <div className="inline-flex items-center justify-between self-stretch">
            <div className="text-lg font-semibold leading-relaxed text-gray-500">{label}</div>
            <div className="text-sm font-normal leading-none text-zinc-600">Total</div>
          </div>
        </div>
      </FlowbiteCard>
    </>
  );
};

export const CSCardAnalytics = (props: CardProps) => {
  const { children, color, ...otherProps } = props;
  return (
    <Card
      color={color as PrimaryColors}
      {...otherProps}
    >
      {children}
    </Card>
  );
};
