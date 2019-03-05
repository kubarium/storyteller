<template>
  <v-toolbar dark dense>
    <v-toolbar-title>Markdown</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <content-operations type="layout" />
      <content-operations type="basic" />
      <content-operations type="table" />
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import ContentOperations from "@/components/ContentOperations.vue";

export default {
  name: "markdown-operations",
  components: {
    ContentOperations
  }
};
</script>

<style>
</style>
