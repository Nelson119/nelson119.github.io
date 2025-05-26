<template>
  <div class="header bg-background" min-h-50px>
    <URadioGroup default-value="theme" :items="items" />
  </div>
</template>

<script setup lang="ts">
  import type { RadioGroupItem } from '@nuxt/ui';

  const items = ref<RadioGroupItem[]>(['System', 'Light', 'Dark']);
  interface Props {
    theme?: string;
  }
  const theme = inject('theme');
</script>

<style scoped></style>
