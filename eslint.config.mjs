import typescriptEslint from '@typescript-eslint/eslint-plugin';
import playwright from 'eslint-plugin-playwright';
import promise from 'eslint-plugin-promise';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'],
    plugins: {
      // This mapping is what ESLint is missing
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
      // Now ESLint will know what "@typescript-eslint" refers to
      '@typescript-eslint/no-explicit-any': 'warn',
      'promise/always-return': 'warn',
      'promise/no-return-wrap': 'warn',
      ...playwright.configs.recommended.rules,
      'playwright/no-standalone-expect': 'off',
      'playwright/missing-playwright-await': 'off',
    },
  },
];
