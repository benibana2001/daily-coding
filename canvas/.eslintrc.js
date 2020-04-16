module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    amd: true,
    'jest/globals': true,
  },
  parser: 'babel-eslint',
  plugins: ['jest'],
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
}
