import type { Config } from 'tailwindcss';
import flowbitePlugin from 'flowbite/plugin';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
  safelist: [{ pattern: /^bg-primary-light-/ }, { pattern: /^bg-primary-dark-/ }],
  theme: {
    // fontSize: {
    //   '2xl': [
    //     '1.5rem',
    //     {
    //       lineHeight: '2rem',
    //       letterSpacing: '-0.01em',
    //       fontWeight: '500',
    //     },
    //   ],
    //   // '3xl': [
    //   //   '1.875rem',
    //   //   {
    //   //     lineHeight: '2.25rem',
    //   //     letterSpacing: '-0.02em',
    //   //     fontWeight: '700',
    //   //   },
    //   // ],
    // },
    extend: {
      fontFamily: {
        montserrat: ['Montserrat'],
      },
      colors: {
        primary: 'var(--primary-color)',
        'primary-light': {
          10: 'var(--primary-light-color-10)',
          20: 'var(--primary-light-color-20)',
        },
        'primary-dark': {
          10: 'var(--primary-dark-color-10)',
          20: 'var(--primary-dark-color-20)',
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
      },
    },
  },
  plugins: [flowbitePlugin],
} satisfies Config;

export default config;
