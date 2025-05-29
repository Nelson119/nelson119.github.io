<template>
  <div class="header bg-background" min-h-50px>
    <RadioGroupRoot v-if="theme" v-model="theme" radio-group aria-label="View density">
      <div item-wrap v-for="({ value, label, icon }, i) in items" :key="i">
        <RadioGroupItem :id="`r${i}`" :value="value" item>
          <RadioGroupIndicator indicator />
        </RadioGroupItem>
        <label label :for="`r${i}`">
          <Icon icon="mdi:home" class="w-5 h-5" />
          {{ label }}
        </label>
      </div>
    </RadioGroupRoot>
  </div>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  let items = [
    {
      value: 'system',
      label: 'System',
      icon: 'i-material-symbols-rocket-launch-rounded',
    },
    {
      value: 'light',
      label: 'Light',
      icon: 'i-material-symbols-add-business-rounded',
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: 'i-material-symbols-star-rounded',
    },
  ];

  const theme = inject('theme');
</script>

<style scoped></style>
