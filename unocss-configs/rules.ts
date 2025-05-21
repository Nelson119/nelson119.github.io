// unocss-configs/rules.ts
import { type Rule } from 'unocss';
import { theme } from './index'; // 假設 theme 從 ./index 匯入

export const rules: Rule[] = [
  // 動態生成 text-h[1-3]-[lg|md|sm]
  [
    /^text-h([1-3])-(lg|md|sm)$/,
    (([, level, size]: [string, '1' | '2' | '3', 'lg' | 'md' | 'sm']) => {
      const sizes: Record<string, Record<string, string>> = {
        h1: { lg: '2.5rem', md: '2rem', sm: '1.75rem' },
        h2: { lg: '2rem', md: '1.75rem', sm: '1.5rem' },
        h3: { lg: '1.5rem', md: '1.25rem', sm: '1rem' },
      };
      return { 'font-size': sizes[`h${level}`][size] };
    }) as any,
  ],
  // 動態生成 h-form-item-[lg|sm]
  [
    /^h-form-item-(lg|md|sm)$/,
    ([, size]: [string, 'lg' | 'md' | 'sm']) => {
      const heights: Record<string, string> = {
        lg: '40px', // 大尺寸螢幕 表單欄位高度
        md: '40px', // 中尺寸螢幕 表單欄位高度
        sm: '32px', // 小尺寸螢幕 表單欄位高度
      };
      return { height: `${heights[size]}!important` };
    },
  ],
  // 新增 RWD 容器規則
  [
    /^container-(sm|md|lg|xl)$/,
    ([, size]: [string, 'sm' | 'md' | 'lg' | 'xl']) => {
      const maxWidths = {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1140px',
      };
      return {
        'max-width': maxWidths[size],
        width: '100%',
        margin: '0 auto',
        padding: '0 15px',
      };
    },
  ],
  // RWD 間距規則
  [
    /^spacing-(sm|md|lg|xl)-(\d+)$/,
    ([, size, value]: [string, 'sm' | 'md' | 'lg' | 'xl', string]) => {
      return {
        [`@media (min-width: ${theme.breakpoints[size]})`]: {
          padding: `${parseInt(value) * 4}px`,
          margin: `${parseInt(value) * 4}px`,
        },
      };
    },
  ],
  // 自定義 bg-attachment 規則
  [
    /^bg-attachment-\[(.*?)\]$/,
    ([, value]: [string, string]) => ({
      'background-attachment': value.replace(/_/g, ' '),
    }),
  ],
];
