# 前端專案

這是一個用 **Nuxt 3** 打造的前端專案，專注打造一個**簡單好用的登入頁面**，全面支援**繁體中文**（用 Noto Sans TC 字型，確保最佳顯示效果），並整合
**Element Plus** 當作 UI 框架，快速建構現代化的使用者介面。專案設計**好維護**，透過自動產生 TypeScript 型別和 Pinia 狀態（例如 `useAuthStore`），提升
開發效率跟程式碼品質。

## 功能亮點

- **框架**：Nuxt 3
- **樣式**：UnoCSS
- **字型**：Noto Sans TC（字粗 400 跟 700）
- **UI 框架**：Element Plus
- **狀態管理**：Pinia
- **程式碼規範**：ESLint、Prettier、Stylelint

## 開始使用

### 安裝

```bash
pnpm install
```

### 開發模式

```bash
pnpm dev
```

### 建構與部署

```bash
pnpm build
pnpm preview
```

想知道更多部署資訊，可以參考 [Nuxt 部署文件](https://nuxt.com/docs/getting-started/deployment)。

## 技術細節

- **框架**：Nuxt 3，提供後端渲染（SSR）跟自動路由管理。
- **樣式**：UnoCSS，支援原子化 CSS，自訂按鈕（`primary-btn`：漸層背景 #E94944 到 #FC7975，`secondary-btn`：灰色背景 #484848）。
- **字型**：Noto Sans TC（從 Google Fonts 載入，字粗 400 跟 700），全站設定在 `unocss-configs/preflights.ts`。
- **UI 框架**：Element Plus，提供表單跟按鈕元件，自動引入並透過 `plugins/element.ts` 解決 SSR 警告。
- **程式碼好維護**：用 VS Code 設定（`.vscode/extensions.json` 跟 `settings.json`）推薦好用的擴充套件並調整編輯器行為，搭配 ESLint（檢查程式
  碼）、Prettier（格式化）跟 Stylelint（CSS 規範），確保程式碼一致性跟品質。
- **狀態管理與型別**：用 Pinia 管理狀態，認證邏輯寫在 `stores/auth/index.ts`，透過 `stores/index.ts` 動態掃描 `stores` 資料夾並產生自動引入設定（例如
  `useAuthStore`）。用 TypeScript 搭配 `unplugin-auto-import`，自動產生並引入 Vue、Nuxt、Pinia 跟 Element Plus 的型別，定義在
  `types/auto-imports.d.ts`。

## Nuxt 3 說明

### 動態路由命名規則

在 Nuxt 3 裡，動態路由的檔案命名跟 Nuxt 2 不太一樣，注意以下幾點：

- **建議命名**：用 `[param].vue` 格式，例如 `pages/sign/[action].vue`，會產生動態路由 `/sign/:action`。
- **舊格式**：`pages/sign/_action.vue` 可能會被誤認成靜態路徑 `/sign/_action`，無法正確解析成動態路由（例如 `/sign/:action`）。
- **解決方法**：把 `_param.vue` 改名成 `[param].vue`，然後清快取：

  ```bash
  mv pages/sign/_action.vue pages/sign/[action].vue
  rm -rf .nuxt
  pnpm dev
  ```

### Pinia 引入與使用

專案使用 Pinia 作為狀態管理工具，並整合了 `@pinia/nuxt` 模組來支援 Nuxt 3 環境。Pinia 提供輕量且直觀的狀態管理方式，適合用來處理全站的狀態，例如認證狀
態（`useAuthStore`）。專案已設定自動引入，無需手動引入 `defineStore` 或 `useAuthStore`，即可直接在元件中使用。

- **引入方式**：在 `nuxt.config.ts` 中加入 `@pinia/nuxt` 模組，並設定自動引入 `defineStore` 和 `acceptHMRUpdate`，讓開發更方便。
- **使用方式**：在 `stores/` 資料夾中定義狀態，例如 `stores/auth/index.ts` 定義了認證相關的狀態和方法（例如登入、登出）。透過自動引入設定，可以直接在
  任何地方使用 `useAuthStore` 來存取狀態。
- **注意事項**：
  - **SSR 環境**：Pinia 在後端無法直接存取 `localStorage`，若使用 `pinia-plugin-persistedstate` 持久化狀態，需注意後端與前端狀態同步問題，建議搭配前端
    專屬的路由守衛或等待水合完成。
  - **水合問題**：水合（hydration、前端狀態狀態完全同步）前，狀態可能尚未從 `localStorage` 同步，需確保關鍵邏輯（例如路由守衛）在水合完成後執行。
  - **插件設定**：若使用 `pinia-plugin-persistedstate`，需在前端環境中註冊插件，避免後端執行時因缺少 `localStorage` 而報錯。

## 注意事項

### 修改 `nuxt.config.ts` 後的 TypeScript 型別更新

如果改了 `nuxt.config.ts`（例如調整 `vite` 設定或自動引入設定），TypeScript 型別可能不會馬上更新，導致編輯器（例如 VS Code）認不出型別。想讓型別正常運
作，可以執行以下指令：

```bash
pnpm postinstall
```

### UnoCSS 設定

- 專案用 `@unocss/nuxt` 模組整合 UnoCSS，不用手動叫用 `UnoCSS()`。
- 在 `nuxt.config.ts` 裡加入模組：

  ```typescript
  modules: ['@unocss/nuxt'],
  unocss: {
    configFile: 'uno.config.ts',
  },
  ```

### SSR 狀態同步問題與解決方案

在使用 Pinia 跟 `pinia-plugin-persistedstate` 做狀態持久化時，`localStorage` 在 SSR 期間沒辦法直接存取，導致 `isAuthenticated` 的初始值跟
`localStorage` 裡的值不一致，影響路由守衛的判斷。

- **問題癥結**：後端沒法用 `localStorage`，所以 `isAuthenticated` 在 SSR 時會一直是初始值（例如 `false`），而前端水合完成前，路由守衛可能已經跑了，沒
  能即時拿到正確的登入狀態。
- **解決方案**：
  1. **前端跑路由守衛**：把路由守衛設成只在前端跑（例如 `middleware/auth.client.ts`），確保 `pinia-plugin-persistedstate` 水合完成後再檢查狀態。
  2. **等水合完成**：用 `pinia-plugin-persistedstate` 的 `afterRestore` 事件，在 `stores/auth/index.ts` 加上 `isHydrated` 狀態，路由守衛等到水合完成再
     跑。
  3. **關掉 SSR**：如果不需要 SSR，可以在 `nuxt.config.ts` 設 `ssr: false`，改用前端渲染（CSR）。

**建議方案**：用 `afterRestore` 事件等水合完成，詳情看 `stores/auth/index.ts` 跟 `middleware/auth.client.ts`。

## VS Code 擴充套件建議

以下是推薦的 VS Code 擴充套件，幫你提升開發效率跟程式碼品質：

- **vue.volar**：支援 Vue 3 跟 Nuxt 3 的語法，還有 IntelliSense。
- **dbaeumer.vscode-eslint**：整合 ESLint，檢查程式碼規範並給修復建議。
- **stylelint.vscode-stylelint**：整合 Stylelint，規範 CSS 跟樣式程式碼。
- **esbenp.prettier-vscode**：整合 Prettier，自動格式化程式碼。
- **lokalise.i18n-ally**：支援國際化（i18n），管理多語言翻譯。
- **antfu.iconify**：支援 Iconify 圖標，提供圖標預覽跟自動補全。
- **antfu.unocss**：幫 UnoCSS 提供 IntelliSense，支援原子化 CSS 類名建議。
- **mikestead.dotenv**：幫 `.env` 檔案提供語法高亮跟 IntelliSense。
- **warmthsea.vscode-custom-code-color**：自訂程式碼顏色，提升可讀性。
- **formulahendry.auto-complete-tag**：自動補全 HTML/XML 標籤。
- **formulahendry.auto-close-tag**：自動關閉 HTML/XML 標籤。
- **formulahendry.auto-rename-tag**：自動重命名配對的 HTML/XML 標籤。
- **naumovs.color-highlight**：高亮程式碼中的顏色值並預覽。
- **steoates.autoimport**：自動引入 JavaScript/TypeScript 模組。
- **christian-kohler.path-intellisense**：提供路徑自動補全，方便引入檔案。

## 自動引入 (Auto Import) 流程

本專案用 `unplugin-auto-import` 來實現自動引入，減少手動 `import` 的麻煩，提升開發效率。以下是自動引入的詳細流程：

### 1. 設定 `unplugin-auto-import`

- 在 `nuxt.config.ts` 裡，我們透過 `vite.plugins` 設了 `AutoImport` 插件，負責自動引入常用的 API 跟元件。
- 自動引入的範圍包含：
  - **Vue**：`ref`、`reactive`、`computed`、`watch`、`onMounted`、`onUnmounted`、`defineComponent`。
  - **Nuxt**：`useRouter`、`useRoute`、`useNuxtApp`。
  - **Pinia**：`defineStore`、`acceptHMRUpdate`。
  - **Element Plus**：`ElMessage` 還有其他在 `components/element-plus/index.ts` 定義的元件（例如 `ElButton`、`ElForm` 等等）。
  - **自訂 Store**：自動掃描 `stores/` 資料夾裡的所有 `index.ts` 檔案，引入對應的 `useXxxStore` 方法（例如 `useAuthStore`）。

### 2. 動態產生 Store 引入

- 在 `stores/index.ts` 裡，我們用 `readdirSync` 掃描 `stores/` 資料夾，動態產生 `storeImports`。
- 每個 `index.ts` 檔案會被轉成一個 `Import` 物件，例如：

  ```typescript
  {
    from: '~/stores/auth',
    imports: ['useAuthStore'],
  }
  ```

### 3. 自動引入 Element Plus 元件

- 在 `nuxt.config.ts` 裡，透過 `unplugin-vue-components/vite` 插件實現 Element Plus 元件的自動引入，不用手動 `import`。
- 設定範例：

  ```typescript
  import Components from 'unplugin-vue-components/vite';
  Components({
    resolvers: [
      ElementPlusResolver({
        importStyle: false, // 禁止自動載入 Element Plus 樣式
      }),
    ],
  }),
  ```

- **功能**：`unplugin-vue-components/vite` 會自動掃描專案中的模板（例如 `.vue` 檔案），根據用到的元件名稱（例如 `<el-button>`）自動引入對應的 Element
  Plus 元件（例如 `ElButton`）。
- **使用方式**：在 `nuxt.config.ts` 的 `vite.plugins` 加上上述設定後，不用手動 `import { ElButton } from 'element-plus'`，就能直接在模板用
  `<el-button>`。`importStyle: false` 表示不自動引入 Element Plus 的 CSS 樣式，需自行在專案中引入樣式（例如透過 `assets` 或 UnoCSS 管理）。

### 額外建議

1. **檢查樣式有沒有完整**：

   - 目前 `plugins/element.ts` 只引入了 `date-picker` 的樣式。如果專案裡有用到其他 Element Plus 元件（例如 `el-button`、`el-form`），需要在
     `plugins/element.ts` 補上對應的樣式引入，不然這些元件可能會沒樣式。
   - 可以檢查專案用到的 Element Plus 元件，然後在 `plugins/element.ts` 補充。例如：

     ```typescript
     if (import.meta.client) {
       import('element-plus/es/components/date-picker/style/css');
       import('element-plus/es/components/button/style/css'); // 幫 el-button 引入樣式
       import('element-plus/es/components/form/style/css'); // 幫 el-form 引入樣式
     }
     ```

---

```目錄結構
NELSON119/
├── .data/                      # 運行時資料（例如資料庫）
├── .nuxt/                      # Nuxt 自動產生的運行時檔案
├── .output/                    # 建構後的輸出檔案（自動產生）
├── .vscode/                    # VS Code 設定
│   ├── extensions.json         # 推薦的 VS Code 擴充套件
│   └── settings.json           # VS Code 編輯器設定
├── assets/                     # 靜態資源（例如字型）
│   └── fonts/                  # 字型資源
│       └── SentyCaramel.ttf    # 自訂字型
├── components/                 # 元件資料夾
│   ├── element-plus/           # Element Plus 元件設定
│   │   └── index.ts            # Element Plus 元件自動引入
│   ├── Footer_black.vue        # 頁尾元件（黑色版）
│   ├── Header.vue              # 頁首元件
│   └── PartnerCard.vue         # 卡片元件
├── internal/                   # 內部設定
│   └── stylelint-config/       # Stylelint 設定
├── layouts/                    # 版面配置
│   ├── default.vue             # 預設版面
│   └── middleware_global.ts    # 全站中介層（middleware）
├── node_modules/               # 專案相依性元件（自動產生）
├── pages/                      # 頁面資料夾
│   ├── sign/                   # 登入/註冊頁面
│   │   └── [action].vue        # 登入/註冊頁面（動態路由）
│   ├── test/                   # 測試頁面
│   │   ├── [id].vue            # 動態測試頁面（依 ID）
│   │   ├── el-message.vue      # Element Plus 訊息元件測試頁面
│   │   ├── font.vue            # 字型測試頁面
│   │   ├── index.vue           # 搜尋首頁
│   │   └── landing.vue         # landing page
│   ├── 404.vue                 # 404 錯誤頁面（找不到路由）
│   └── index.vue               # 首頁
├── plugins/                    # Nuxt 插件
│   ├── element.ts              # Element Plus SSR 設定
│   ├── error-handler.ts        # 錯誤處理插件
│   └── pinia-persist.client.ts # Pinia 持久化插件（前端）
├── public/                     # 公開靜態資源
│   ├── images/                 # 圖片資源
│   │   └── sign/               # 登入頁面相關圖片
│   ├── favicon.ico             # 網站圖標
│   └── robots.txt              # SEO 設定
├── server/                     # 伺服器相關
├── stores/                     # 狀態管理
│   ├── auth/                   # 認證狀態管理
│   │   └── index.ts            # 認證狀態管理
│   └── index.ts                # 動態掃描 stores 資料夾並產生自動引入設定
├── types/                      # 型別定義
│   ├── auto-imports.d.ts       # 自動引入的型別（自動產生）
│   ├── components.d.ts         # 元件型別（自動產生）
│   ├── nuxt.d.ts               # Nuxt 型別（自動產生）
│   ├── pinia.d.ts              # Pinia 型別
│   ├── ts-shim.d.ts            # TypeScript 補充型別
│   └── unocss.d.ts             # UnoCSS 型別
├── unocss-configs/             # UnoCSS 設定
│   ├── shortcuts/              # 快捷原子（Shortcuts）設定
│   │   └── components/         # 元件相關快捷原子
│   │       ├── element-plus-override/  # Element Plus 元件樣式覆寫
│   │       │   ├── el-button.ts    # Element Plus 按鈕樣式覆寫
│   │       │   ├── el-form-item.ts # Element Plus 表單項樣式覆寫
│   │       │   ├── el-input.ts     # Element Plus 輸入框樣式覆寫
│   │       │   ├── el-message.ts   # Element Plus 訊息提示樣式覆寫
│   │       │   ├── el-select.ts    # Element Plus 下拉選單樣式覆寫
│   │       │   └── index.ts        # 匯出所有 Element Plus 覆寫快捷原子
│   │       ├── pages/              # 頁面相關快捷原子
│   │       │   ├── hero/           # 首頁 Hero 區塊快捷原子
│   │       │   │   └── index.ts    # Hero 區塊快捷原子定義
│   │       │   └── sign/           # 登入/註冊頁面快捷原子
│   │       │       └── index.ts    # 登入頁面快捷原子定義
│   │       ├── components.ts       # 通用元件快捷原子（例如按鈕、佈局）
│   │       └── titles.ts           # 標題相關快捷原子（例如網站標題、頁面標題）
│   ├── index.ts                    # UnoCSS 設定匯出（整合所有設定）
│   ├── preflights.ts               # 全站樣式（例如字型、CSS 重置）
│   └── theme.ts                    # 主題設定（例如顏色、字型大小、斷點）
├── app.vue                     # Nuxt 根元件
├── nuxt.config.ts              # Nuxt 設定檔
├── .eslintrc.ts                # ESLint 設定
├── .prettierrc                 # Prettier 設定
├── .prettierignore             # Prettier 忽略設定
├── .stylelintignore            # Stylelint 忽略設定
├── .stylelintrc.mjs            # Stylelint 設定
├── eslint.config.mjs           # ESLint 設定
├── tsconfig.json               # TypeScript 設定
├── uno.config.ts               # UnoCSS 設定
├── package.json                # 專案相依性元件和腳本
├── .gitignore                  # Git 忽略設定
├── pnpm-lock.yaml              # PNPM 鎖定檔案（自動產生）
├── pnpm-workspace.yaml         # PNPM 工作區設定
└── README.md                   # 專案說明
```
