<script setup lang="ts">


</script>
<template>
  <div class="flex flex-1/2 flex-col gap-2">
    <Menubar>
      <template #start>
        <span class="text-emerald-900 text-lg font-bold">Markdown</span>
      </template>
      <template #end>
        <MarkdownSettings :disabled="true" />
      </template>
    </Menubar>

    <MarkdownEditor />
  </div>
</template>
