import ElementPlus, { ID_INJECTION_KEY } from 'element-plus';
import zh from 'element-plus/es/locale/lang/zh-tw.mjs';
import { defineNuxtPlugin } from 'nuxt/app';
import { ZINDEX_INJECTION_KEY } from 'element-plus';

// 客戶端執行時引入日期選擇的樣式
if (import.meta.client) {
  import('element-plus/es/components/date-picker/style/css');
}

export default defineNuxtPlugin((nuxtApp: any) => {
  nuxtApp.vueApp
    .use(ElementPlus, { locale: zh })
    .provide(ID_INJECTION_KEY, {
      prefix: `tci`,
      current: `${new Date().getTime() * 1}`,
    })
    .provide(ZINDEX_INJECTION_KEY, { current: 0 });
});
