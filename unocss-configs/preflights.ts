// unocss-configs/preflights.ts
import type { Preflight } from 'unocss';
import fs from 'fs';
import path from 'path';

// 從當前文件位置回溯到專案根目錄
const rootDir = path.resolve(__dirname, '..'); // 回溯到 sugar-club-frontend/
// 構建 normalize.css 的正確路徑
const normalizePath = path.resolve(rootDir, 'node_modules/normalize.css/normalize.css');
// 同步讀取 normalize.css 內容
const normalizeCss = fs.readFileSync(normalizePath, 'utf-8');

export const preflights: Preflight[] = [
  {
    getCSS: () => normalizeCss, // 將 normalize.css 注入 preflight
  },
  {
    getCSS: () => `
      @layer element-plus, unocss;
      @font-face {
        font-family: 'SentyCaramel';
        src: url('/fonts/SentyCaramel.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      html, body, #__nuxt {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Noto Sans TC, sans-serif;
      }
    `,
  },
];
