<template>
  <div class="header bg-background" min-h-50px>
    <RadioGroup :default-value="theme">
      <RadioGroupItem value="light">light</RadioGroupItem>
      <RadioGroupItem value="dark">dark</RadioGroupItem>
    </RadioGroup>
  </div>
</template>

<script setup lang="ts">
  import RadioGroup from './ui/radio-group/RadioGroup.vue';
  import RadioGroupItem from './ui/radio-group/RadioGroupItem.vue';

  interface Props {
    theme?: string;
  }
  const theme = inject('theme');
</script>

<style scoped></style>
