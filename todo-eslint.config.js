/*
  Placeholder file
  Support for ESLint flat config is still limited as of 12/05/2023
  https://github.com/typescript-eslint/typescript-eslint/issues/7694#issue-1913595156
*/

import path from 'path';
import { fileURLToPath } from 'url';
import parser from '@typescript-eslint/parser';
import globals from 'globals';
import react from 'eslint-plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parser: parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    files: ['**/*.js'],
    ignores: ['vite.config.ts', 'src/vite-env.d.ts', 'dist/**/*'],
    plugins: {
      react,
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': 'warn',
    },
  },
];
