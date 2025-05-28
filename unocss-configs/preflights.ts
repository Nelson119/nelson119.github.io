// unocss-configs/preflights.ts
import type { Preflight } from 'unocss';
import fs from 'fs';
import path from 'path';

// 從當前文件位置回溯到專案根目錄
const rootDir = path.resolve(__dirname, '..');
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
        font-family: 'iansui';
        src: url('/fonts/Iansui-Regular.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'huninn';
        src: url('/fonts/jf-openhuninn-2.1.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      :root {
        --color-scheme: light;
      }

      [theme=light], .theme-light {
        --color-scheme: light;
        color-scheme: light;
        --theme-primary: #FF6B6B;
        --theme-background: #f0f0f0;
        --theme-strip: #333;
        --theme-text-color: #2C3E50;
        --theme-font: 'iansui';
        color: var(--theme-text-color);
      }

      [theme=dark], .theme-dark {
        --color-scheme: dark;
        color-scheme: dark;
        --theme-primary: #dedede;
        --theme-background: #333;
        --theme-strip: #f0f0f0;
        --theme-text-color: #dedede;
        --theme-font: 'huninn';
        color: var(--theme-text-color);
      }

      h1, h2, h3 {
        font-family: var(--theme-font), cursive;
      }
      h4, h5, h6 {
        font-family: var(--theme-font), cursive;
      }

      :root {
        font-size: 13px;
        font-family: "Noto Sans TC", cursive;
      }

      html, body, #__nuxt {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    `,
  },
];
