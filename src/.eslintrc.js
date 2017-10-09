module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    React: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: [
    'react',
  ],
  rules: {
    "react/prop-types": 0,
  },
};
