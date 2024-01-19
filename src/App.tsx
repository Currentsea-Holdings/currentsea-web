import React from 'react';
import { ThemeProvider } from '@emotion/react';
import DashboardLayout from './layout/DashboardLayout';
import { useTheme } from '@/hooks/useTheme';
import { Home } from '@/views/Home/Home';
  
  const App: React.FC = () => {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme.value}>
      <DashboardLayout theme={theme.value}>
        <Home />
        </DashboardLayout>
    </ThemeProvider>
  );
};

export default App;
