import { CSSidebar } from '@/layout/components/CSSidebar';
import { MainContent } from '@/layout/components/MainContent';
import type { Theme } from '@/hooks/useTheme';

interface DashboardLayoutProps {
  theme: Theme;
  children?: React.ReactNode;
}

const DashboardLayout = ({ theme, children }: DashboardLayoutProps) => {
  return (
    <div className="relative flex flex-1 w-full min-h-dvh">
      <CSSidebar className="fixed h-full" />
      <MainContent className="ml-64">{children}</MainContent>
    </div>
  );
};

export default DashboardLayout;
