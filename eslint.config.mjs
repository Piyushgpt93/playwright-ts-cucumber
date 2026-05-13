import typescriptEslint from '@typescript-eslint/eslint-plugin';
import playwright from 'eslint-plugin-playwright';
import promise from 'eslint-plugin-promise';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      playwright,
      promise,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'promise/always-return': 'warn',
      'promise/no-return-wrap': 'warn',
      ...playwright.configs.recommended.rules,
    },
  },
];
