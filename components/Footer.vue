<template>
  <div class="header bg-background" min-h-50px></div>
</template>

<script setup lang="ts">
  interface Props {
    theme?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    theme: 'dark',
  });
</script>
