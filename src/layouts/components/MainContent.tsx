import classNames from 'classnames';
import type { FC } from 'react';


interface MainContentProps {
  className?: string;
  children?: React.ReactNode;
}

export const MainContent: FC<MainContentProps> = ({ className, children, ...props }: MainContentProps) => {
  return (
    <main
      className={classNames(
        `overflow-y-auto bg-gray-10 flex flex-col items-stretch flex-1 w-full p-4 pt-20 dark:bg-gray-900 lg:pt-4 ${className}`,
      )}
    >
      {children}
    </main>
  );
};
