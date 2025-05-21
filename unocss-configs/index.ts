// unocss-configs/index.js
import { componentShortcuts } from './shortcuts/components';
import { theme } from './theme';
import { preflights } from './preflights';
import { rules } from './rules';

export const shortcuts = {
  ...componentShortcuts,
};

export { theme, preflights, rules };
