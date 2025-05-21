//

import { elButton } from './el-button';
import { elFormItem } from './el-form-item';
import { elInput } from './el-input';
import { elMessage } from './el-message';
import { elSelect } from './el-select';

export const elOverride = {
  ...elButton,
  ...elFormItem,
  ...elInput,
  ...elMessage,
  ...elSelect,
  'el-date-picker': `
    !w-full
  `,
  'el-popper': `
    bg-white
  `,
};
