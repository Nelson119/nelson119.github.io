// stores/index.ts
import { readdirSync } from 'fs';
import { join } from 'path';

// 手動定義 InlinePreset 型別，根據 unplugin-auto-import 的格式
type InlinePreset = {
  from: string;
  imports: string[];
};

// 動態掃描 stores 資料夾
const storeDirs = readdirSync(join(__dirname, '.'), { withFileTypes: true })
  .filter((dir) => dir.isDirectory() && dir.name !== 'index.ts') // 排除 index.ts
  .map((dir) => dir.name);

const storeImports: InlinePreset[] = storeDirs.map((storeName) => {
  const importName = `use${storeName.charAt(0).toUpperCase() + storeName.slice(1)}Store`;
  return {
    from: `~/stores/${storeName}`,
    imports: [importName],
  };
});

export { storeImports };
