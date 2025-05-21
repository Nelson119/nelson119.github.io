// eslint.config.mts
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import tseslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

// 使用 await 解析 withNuxt() 的返回值
const nuxtConfig = await withNuxt();

// 自訂配置
const customConfig = [
  {
    // 適用於 TypeScript 文件
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      quotes: 'off',
      '@typescript-eslint/quotes': 'off',
      indent: 'off',
      '@typescript-eslint/indent': 'off',
    },
  },
  {
    // 適用於 Vue 文件
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'vue/html-quotes': 'off',
      'vue/html-indent': 'off',
      'vue/html-self-closing': 'off', // 關閉這個規則，讓 Prettier 決定標籤格式
    },
  },
];

// 合併 Nuxt 預設配置與自訂配置
export default [...nuxtConfig, ...customConfig];
