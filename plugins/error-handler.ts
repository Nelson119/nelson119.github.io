// plugins/error-handler.ts
import { defineNuxtPlugin, navigateTo } from 'nuxt/app';
import type { NuxtError } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:error', async (error: NuxtError) => {
    // 檢查是否為 404 錯誤
    if (error.statusCode === 404) {
      // 修改錯誤訊息（可選）
      // 直接重定向到 /404 路由
      await navigateTo('/404', { replace: true });

      return;
    }
  });
});
