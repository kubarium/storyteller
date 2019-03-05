<template>
  <v-toolbar dark dense>
    <v-toolbar-title>Markdown</v-toolbar-title>
    <v-spacer/>
    <style-selector/>
    <content-operations type="layout"/>
    <content-operations type="basic"/>
    <content-operations type="table"/>
    <v-toolbar-items></v-toolbar-items>
  </v-toolbar>
</template>

<script>
import ContentOperations from "@/components/ContentOperations.vue";
import StyleSelector from "@/components/StyleSelector.vue";

export default {
  name: "markdown-operations",
  components: {
    ContentOperations,
    StyleSelector
  }
};
</script>

<style>
</style>
