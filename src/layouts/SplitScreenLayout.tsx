import classNames from 'classnames';
import type React from 'react';

interface SplitScreenLayoutProps {
  Left: React.ReactNode;
  Right: React.ReactNode;
  className?: string;
}

export const SplitScreenLayout = ({ Left, Right, className }: SplitScreenLayoutProps) => {
  return (
    <div className={classNames('grid h-screen grid-cols-2', className)}>
      <div className="col-span-1">{Left}</div>
      <div className="col-span-1">{Right}</div>
    </div>
  );
};
