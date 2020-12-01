module.exports = {
  // Run type-check on changes to PWA's TypeScript files
  'pwa/**/*.ts?(x)': () => 'yarn pwa:type-check',
  // Run ESLint on changes to JavaScript/TypeScript files
  '**/*.(ts|js)?(x)': (filenames) => `yarn lint ${filenames.join(' ')}`,
}
