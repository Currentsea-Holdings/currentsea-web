import type { Theme } from '@/hooks/useTheme';
import { SplitScreenLayout } from '@/layouts/SplitScreenLayout';

interface AuthSplitLayoutProps {
  theme?: Theme;
  backgroundImageUrl?: string;
  children?: React.ReactNode;
}

export const SocialMediaConnectLayout = ({
  theme,
  backgroundImageUrl,
  children,
}: AuthSplitLayoutProps) => {
  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return SplitScreenLayout({
    Left: (
      <div
        style={backgroundImageStyle}
        className="bg-primary-600 hidden h-full items-center justify-center px-4 py-6 sm:px-0 lg:flex lg:py-0"
      />
    ),
    Right: (
      <div className="flex h-full flex-col items-center justify-center px-4 py-6 sm:px-0">
        {children}
      </div>
    ),
  });
};
