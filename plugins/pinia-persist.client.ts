// plugins/pinia-persist.client.ts
import { defineNuxtPlugin } from 'nuxt/app';
import type { Pinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia; // 從 Nuxt 上下文中獲取 Pinia 實例
  pinia.use(piniaPluginPersistedstate); // 註冊持久化插件
});
