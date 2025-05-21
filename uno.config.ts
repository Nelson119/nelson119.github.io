// uno.config.ts
import { defineConfig, type Preset } from 'unocss';
import presetUno from '@unocss/preset-uno';
import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import { shortcuts, theme, preflights, rules } from './unocss-configs';

export default defineConfig({
  presets: [
    presetUno() as Preset,
    presetAttributify() as Preset,
    presetIcons({
      scale: 1.2,
      warn: true,
    }) as Preset,
  ],
  theme,
  rules,
  preflights,
  shortcuts,
  safelist: [
    // 沒被引用時也要啟用的快捷，用於程式動態產生的場景會用到的快捷
    'font-noto',
    'font-Senty',
    'el-button',
    'el-input',
    'el-select',
    'el-form',
    'el-form-item',
    'el-input__inner',
    'el-input__wrapper',
    'el-select__wrapper',
    'el-select__selection',
    'el-select__placeholder',
    'el-select__input',
    'el-select-dropdown',
    'el-select__suffix',
    'el-popper',
    'el-date-picker',
    'el-input__prefix',
    'el-input__suffix',
    'el-form-item__error',
    'el-message-base',
    'el-message-gradient',
    'el-message-success',
    'el-message-warning',
    'el-message-error',
    'el-message-info',
    'el-message-icon',
    'el-message-close',
    'icon',
    'icon-account',
  ],
  cli: {
    debug: true, // 啟用調試模式
  },
} as any);
