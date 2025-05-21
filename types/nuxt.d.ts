// types/nuxt.d.ts
import { NuxtConfig } from '@nuxt/schema';

declare module '#app' {
  interface NuxtApp {
    $pinia: import('pinia').Pinia;
  }
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    pinia?: {
      autoImports?: string[];
    };
    piniaPersistedstate?: {
      storage?: string;
    };
  }
}

// 確保 NuxtConfig 包含原始屬性
declare module 'nuxt/config' {
  interface NuxtConfig {
    pinia?: {
      autoImports?: string[];
    };
    piniaPersistedstate?: {
      storage?: string;
    };
  }
}
