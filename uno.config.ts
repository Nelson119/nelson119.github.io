// uno.config.ts
import { defineConfig, type Preset } from 'unocss';
import presetUno from '@unocss/preset-uno';
import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import { shortcuts, theme, preflights, rules } from './unocss-configs';
import { presetTheme } from 'unocss-preset-theme';
// import { presetReka } from 'reka-ui/preset';

export default defineConfig({
  variablePrefix: 'ui-',
  prefix: 'ui-',
  presets: [
    presetUno() as Preset,
    presetAttributify() as Preset,
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }) as Preset,
  ],
  theme,
  rules,
  preflights,
  shortcuts,
  // 沒被引用時也要啟用的快捷，用於程式動態產生的場景會用到的快捷
  safelist: ['font-noto', 'font-Senty', 'icon'],
  cli: {
    debug: true, // 啟用調試模式
  },
} as any);
