module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:storybook/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'react', 'react-refresh'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    "@typescript-eslint/no-unsafe-call": "off",
    '@typescript-eslint/no-misused-promises': [
      'error', // or 'warn'
      { checksVoidReturn: false },
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/restrict-template-expressions': [
      'error', 
      { allowNumber: true }
    ],
  },
  root: true,
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [['@', './src']],
      },
    },
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}', 'eslint.config.js'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  ignorePatterns: ['src/stories/**/*', 'src/**/*.stories.tsx', 'vite.config.ts'],
};
