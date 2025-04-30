<script setup lang="ts">
import { usePreviewStore } from '@/stores/preview';
const preview = usePreviewStore()
</script>
<template>
  <div id="preview">
    {{ preview.render }}
  </div>
</template>
<!-- <style scoped lang="css" src="https://unpkg.com/bonsai.css@latest/dist/bonsai.min.css"></style> -->
<!-- <style scoped src=""></style>
<style scoped src=""></style> -->

<style scoped lang="css">
#preview {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
