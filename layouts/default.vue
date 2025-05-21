<template>
  <div flex flex-col min-h-100vh>
    <!-- 頁面頂部導航欄 -->
    <Header :theme="theme" />

    <!-- 主要內容區域 -->
    <main :theme="theme" class="container flex-grow-1 w-1200px mx-auto py-10px">
      <slot />
    </main>

    <!-- 頁面底部 -->
    <Footer :theme="theme" />
  </div>
</template>

<script setup>
  const theme = 'light';
</script>

<style scoped>
  .dark {
    background-color: #000;
    color: #fff;
  }

  .light {
    background-color: #dbdbdb;
    color: #2f2f2f;
  }
</style>
