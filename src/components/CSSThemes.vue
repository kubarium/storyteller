<script setup lang="ts">
import { usePreviewStore } from '@/stores/preview';


const preview = usePreviewStore()
const change_theme = (theme: object) => {
  console.log('Changing theme to', preview.theme);

  preview.theme = theme
}
</script>
<template>
  <SplitButton label="CSS Themes" :model="preview.CSS_THEMES" size="small">
    <template #item="{ item }">
      <a @click="change_theme(item)" class="p-2 items-center inline-flex w-full h-9">{{ item.label }}</a>
    </template>
  </SplitButton>

</template>
