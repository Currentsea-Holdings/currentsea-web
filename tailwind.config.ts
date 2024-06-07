import type { Config } from 'tailwindcss';
import flowbite from 'flowbite-react/tailwind';

const config: Config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    flowbite.content(),
  ],
  safelist: [{ pattern: /^bg-primary-light-/ }, { pattern: /^bg-primary-dark-/ }],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
          800: 'var(--primary-color-800)',
          light: {
            10: 'var(--primary-light-color-10)',
            20: 'var(--primary-light-color-20)',
          },
          dark: {
            10: 'var(--primary-dark-color-10)',
            20: 'var(--primary-dark-color-20)',
          },
        },
        offwhite: 'var(--offwhite-color)',
        white: 'var(--white-color)',
        dark: 'var(--dark-color)',
        gray: {
          10: 'var(--gray-color-10)',
          20: 'var(--gray-color-20)',
          30: 'var(--gray-color-30)',
          40: 'var(--gray-color-40)',
          50: 'var(--gray-color-50)',
          60: 'var(--gray-color-60)',
        },
        'custom-blue': '#2b4398',
      },
    },
  },
  plugins: [flowbite.plugin()],
};

export default config;
