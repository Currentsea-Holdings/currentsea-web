export const changeColor = (newColor: string) => {
  document.documentElement.style.setProperty('--primary-color', newColor);
};

import { signal } from '@preact/signals-react';

export type Theme = {
  colors: {
    primary: string;
    white: string;
  };
};

export const useTheme = () => {
  const theme = signal<Theme>({
    colors: {
      primary: 'hotpink',
      white: '#fff',
    },
  });
  
  // const toggleTheme = () => {
  //   theme.value = theme.value === 'light' ? 'dark' : 'light';
  // };

  return { theme };
};