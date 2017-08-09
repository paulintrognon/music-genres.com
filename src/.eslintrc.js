module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true,
    browser: true,
  },
  globals: {
    React: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: [
    'react',
  ],
};
