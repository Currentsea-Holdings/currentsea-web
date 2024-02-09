import type { Theme } from '@/hooks/useTheme';
import { SplitScreenLayout } from '@/layouts/SplitScreenLayout';

interface AuthSplitLayoutProps {
  theme?: Theme;
  backgroundImageUrl?: string;
  children?: React.ReactNode;
}

export const AuthSplitLayout = ({ theme, backgroundImageUrl, children }: AuthSplitLayoutProps) => {
  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return SplitScreenLayout({
    Left: (
      <div className="flex items-center justify-center h-full px-4 py-6 sm:px-0">{children}</div>
    ),
    Right: (
      <div
        style={backgroundImageStyle}
        className="items-center justify-center hidden h-full px-4 py-6 lg:flex bg-primary-600 lg:py-0 sm:px-0"
      />
    ),
  });
  // <div className="bg-white dark:bg-gray-900">
  //   <div className="grid lg:h-screen lg:grid-cols-2">
  //   <div className="flex items-center justify-center px-4 py-6 lg:py-0 sm:px-0">
  //     {children}
  //     </div>
  //     <div
  //       style={backgroundImageStyle}
  //       className="items-center justify-center hidden px-4 py-6 lg:flex bg-primary-600 lg:py-0 sm:px-0"
  //     ></div>
  //   </div>
  // </div>
};
