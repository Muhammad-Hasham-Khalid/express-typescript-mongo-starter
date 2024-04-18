module.exports = {
  root: true,
  env: { browser: false, es2021: true, node: true },
  extends: ['love', 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  ignorePatterns: ['node_modules', 'build', '.eslintrc.cjs', '.vscode'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {},
};
