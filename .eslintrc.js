// .eslintrc.js
module.exports = {
  root: true,
  env: { node: true, es6: true },

  // to enable features such as async/await
  parserOptions: {
    ecmaVersion: 2018,
  },

  // We want to lint .prettierrc.js (ignored by default by eslint)
  ignorePatterns: ['!.prettierrc.js'],

  // We extends eslint recommended rules
  extends: ['eslint:recommended'],

  // Enforce prettier rules
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },

  // Folder specific configurations
  overrides: [
    /**
     * PWA Configuration
     */
    {
      files: ['pwa/**/*.ts', 'pwa/**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: { react: { version: 'detect' } },
      env: { browser: true, node: true, es6: true },
      extends: [
        // Eslint & TypeScript base rules
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',

        // React & a11y plugins
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',

        // Prettier Plugin
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
      ],
      rules: {
        // We will use TypeScript's types for component props instead
        'react/prop-types': 'off',

        // No need to import React when using Next.js
        'react/react-in-jsx-scope': 'off',

        // This rule is not compatible with Next.js's <Link /> components
        'jsx-a11y/anchor-is-valid': 'off',

        // Why would you want unused vars?
        '@typescript-eslint/no-unused-vars': ['error'],

        // We require return types on functions only where really useful
        '@typescript-eslint/explicit-function-return-type': [
          'warn',
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
      },
    },

    /**
     * test files
     */
    {
      files: ['**/*.test.js'],
      env: {
        mocha: true,
      },
    },
  ],
}
