<script setup>
  definePageMeta({
    layout: 'default',
  });
  const route = useRoute();
  const id = computed(() => route.params.id);
  const showMessage = (type) => {
    ElMessage({
      duration: 0, // 設置為 0，表示不自動關閉
      showClose: true, // 顯示關閉按鈕
      message: `這是 ${type} 訊息`,
      type,
    });
  };
</script>

<template>
  <div>
    {{ id }}
    <el-button @click="showMessage('success')">Success</el-button>
    <el-button @click="showMessage('warning')">Warning</el-button>
    <el-button @click="showMessage('error')">Error</el-button>
    <el-button @click="showMessage('info')">Info</el-button>
  </div>
</template>
