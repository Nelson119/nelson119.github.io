import { navigateTo } from 'nuxt/app';

import { defineNuxtRouteMiddleware } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to, from) => {
  // 只在客戶端執行
  if (process.server) {
    return; // 伺服器端不執行
  }
  const auth = useAuthStore(); // 從 Pinia 獲取認證狀態
  const exclusive = ['landing', 'sign-action'];

  // 如果用戶未登入，且目標路由不是登入頁面，則重定向到登入頁面
  if (!auth.isAuthenticated) {
    if (!exclusive.includes(to.name as string)) {
      return navigateTo('/landing');
    } else if (to.name == 'sign-action') {
      return;
    }
  }
  // 如果用戶已登入，但嘗試訪問登入頁面，可以選擇重定向到首頁
  else if (auth.isAuthenticated && to.name === 'sign-action') {
    return navigateTo('/');
  } else {
  }
});
