<template>
  <div flex flex-col min-h-100vh :class="`theme-${theme}`">
    <!-- 頁面頂部導航欄 -->
    <Header />

    <!-- 主要內容區域 -->
    <main class="container flex-grow-1 w-1200px mx-auto min-h-full relative">
      <slot />
    </main>

    <!-- 頁面底部 -->
    <Footer />
  </div>
</template>

<script setup>
  const theme = ref('light');
  provide('theme', theme);
</script>
