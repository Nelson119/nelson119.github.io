<!-- pages/404.vue -->
<template>
  <div class="not-found">
    <h1>404 - 頁面未找到</h1>
    <p>抱歉，您訪問的頁面不存在。</p>
    <nuxt-link href="landing">返回首頁</nuxt-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
</style>
