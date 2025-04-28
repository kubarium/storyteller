<script setup lang="ts">
import { useEditorStore } from '@/stores/editor';

const editorStore = useEditorStore()

onMounted(() => {
  console.log('Preview mounted');
})
</script>
<template>
  <div class="flex flex-1/2 flex-col gap-2">
    <Menubar>
      <template #start>
        <span class="text-yellow-950 text-lg font-bold">Preview</span>
      </template>
    </Menubar>
    <iframe class="h-full w-full" :srcdoc="editorStore.render" />
  </div>
</template>
