module.exports = {
  env: {
    browser: true,
    es2021: true
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
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: true,
      tsconfigRootDir: __dirname
    },
    plugins: ['@typescript-eslint', 'react', 'react-refresh'],
    rules: {
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-refresh/only-export-components': 'warn'
    },
    root: true,
    settings: {
        react: {
            version: 'detect'
        }
    },
    overrides: [
      {
        env: {
          node: true
        },
        files: ['.eslintrc.{js,cjs}', 'eslint.config.js'],
        parserOptions: {
          sourceType: 'script'
        }
      }
    ]
};
