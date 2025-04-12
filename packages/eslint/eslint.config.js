import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    es2021: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'warn',
    'import/no-unresolved': 'error',
    'node/no-missing-import': 'warn',
  },
});
