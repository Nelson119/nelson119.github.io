// unocss-configs/theme.ts
import type { PresetUnoTheme } from 'unocss';

export const theme: typeof PresetUnoTheme = {
  colors: {
    primary: '#FC7975',
    primaryGradientStart: '#E94944',
    primaryGradientEnd: '#FC7975',
    secondary: '#FFFFFF',
    background: '#F5F5F5',
    text: '#333333',
    gray: {
      default: '#484848',
      100: '#989898',
      200: '#b3b3b3',
    },
    lightgray: '#b3b3b3',
    success: '#67C23A',
    successBg: '#F0F9EB',
    warning: '#E6A23C',
    warningBg: '#FDF6EC',
    error: '#F56C6C',
    errorBg: '#FEF0F0',
    info: '#909399',
    infoBg: '#F4F4F5',
  },
  fontFamily: {
    sans: 'Noto Sans TC, sans-serif', // 改為 Noto Sans TC
  },
  fontSize: {
    base: '15px',
    title: '36px',
    'base-mobile': '13px',
    'title-mobile': '28px',
    'h1-lg': '2.5rem', // 40px
    'h2-lg': '2rem', // 32px
    'h3-lg': '1.5rem', // 24px
    'h1-md': '2rem', // 32px
    'h2-md': '1.75rem', // 28px
    'h3-md': '1.25rem', // 20px
    // 其他文字大小
    lg: '1rem', // 18px
    sm: '0.875rem', // 14px
  },
  fontWeight: {
    normal: '400',
    bold: '700',
  },
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
  },
  borderRadius: {
    button: '8px',
  },
  boxShadow: {
    card: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '800px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px', // 新增更大的斷點
  },
};
