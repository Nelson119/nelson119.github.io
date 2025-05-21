<template>
  <div :class="theme" class="header" min-h-50px>
    <div class="header-left"></div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    theme?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    theme: 'dark',
  });
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
