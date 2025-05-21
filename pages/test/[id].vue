<template>
  <div>
    <h1>Test Page: {{ id }}</h1>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const id = computed(() => route.params.id as string);
</script>
