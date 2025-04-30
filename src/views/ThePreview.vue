<script setup lang="ts">
import { usePreviewStore } from '@/stores/preview';

const previewStore = usePreviewStore()
//https://github.com/awesome-css-group/awesome-css?tab=readme-ov-file
//https://github.com/dbohdan/classless-css?tab=readme-ov-file#classless-css
//https://dohliam.github.io/dropin-minimal-css/
onMounted(() => {
  console.log('Preview mounted');
})
</script>
<template>
  <div class="flex flex-1/2 flex-col gap-2">
    <Menubar>
      <template #start>
        <span class="text-green-950 text-lg font-bold">Preview</span>
      </template>
      <template #end>
        <CSSThemes />
      </template>
    </Menubar>
    <!-- <div class="pages h-full w-full">
      <Render />
    </div> -->
    <ScrollPanel class="h-full w-full overflow-hidden p-3">
      <iframe class="w-full h-full" :srcdoc="previewStore.srcdoc" />
    </ScrollPanel>
  </div>
</template>
