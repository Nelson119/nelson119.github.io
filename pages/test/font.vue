<!-- pages/test/font.vue -->
<template>
  <div class="font-test-page">
    <h1>字型測試頁面</h1>

    <!-- 輸入框綁定字型 -->
    <el-input v-model="fontFamily" placeholder="請輸入字型名稱 (例如: Noto Sans TC, Arial)" clearable class="font-input" />

    <!-- 展示應用字型的各個 HTML 標籤 -->
    <div class="font-preview" :style="{ fontFamily: fontFamily || 'SentyCaramel' }">
      <h1>這是 H1 標題</h1>
      <h2>這是 H2 標題</h2>
      <h3>這是 H3 標題</h3>
      <h4>這是 H4 標題</h4>
      <h5>這是 H5 標題</h5>
      <h6>這是 H6 標題</h6>
      <p>這是一段文字 (Paragraph)</p>
      <i>這是斜體文字 (Italic)</i>
      <b>這是粗體文字 (Bold)</b>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  // 定義響應式字型變數，預設為 Noto Sans TC
  const fontFamily = ref('SentyCaramel');
</script>
