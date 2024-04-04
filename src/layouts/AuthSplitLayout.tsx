import type { Theme } from '@/hooks/useTheme';
import { SplitScreenLayout } from '@/layouts/SplitScreenLayout';

interface AuthSplitLayoutProps {
  // splitRatio: number;
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
    Left: <div className="flex h-full justify-center px-4 py-6 pt-20 sm:px-0">{children}</div>,
    Right: (
      <div
        style={backgroundImageStyle}
        className="bg-primary-600 hidden h-full items-center justify-center px-4 py-6 sm:px-0 lg:flex lg:py-0"
      />
    ),
  });
};
