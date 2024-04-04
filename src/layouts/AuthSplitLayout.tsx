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

  
  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className="flex flex-1 items-center justify-center px-4 py-6 lg:px-6 lg:bg-transparent">
        {children}
      </div>
      <div
        style={backgroundImageStyle}
        className="hidden h-full w-full lg:flex lg:w-1/2"
      />
    </div>
  );
};
