import path from 'path';

export default {
  root: true,
  configBasedir: path.dirname(new URL(import.meta.url).pathname), // 指定基底目錄為當前專案目錄
  extends: ['@internal/stylelint-config'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['use', 'forward'], // 忽略 @use 和 @forward 語法檢查
      },
    ],
  },
};
