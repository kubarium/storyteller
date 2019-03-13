<template>
  <v-toolbar dark dense>
    <v-toolbar-title>Preview</v-toolbar-title>
    <v-spacer/>

    <v-toolbar-items>
      <v-btn flat @click="fullscreen">
        <v-icon v-if="$store.state.preview.fullscreen">fullscreen_exit</v-icon>
        <v-icon v-else>fullscreen</v-icon>
      </v-btn>
      <v-divider vertical/>
      <style-selector/>
      <v-divider vertical/>
      <paper-size-selector/>
      <v-divider vertical/>
      <print-operations/>
      <v-divider vertical/>
      <file-operations/>

      <!-- <v-divider vertical></v-divider> -->
      <!-- <v-btn @click="$store.dispatch('newMarkdown')" flat>
        <v-icon>fiber_new</v-icon>
      </v-btn>-->
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import FileOperations from "@/components/FileOperations.vue";
import PaperSizeSelector from "@/components/PaperSizeSelector.vue";
import PrintOperations from "@/components/PrintOperations.vue";
import StyleSelector from "@/components/StyleSelector.vue";
export default {
  name: "preview-operations",
  components: {
    FileOperations,
    PaperSizeSelector,
    PrintOperations,
    StyleSelector
  },
  methods: {
    fullscreen() {
      document.body.dispatchEvent(new Event("fullscreenchange"));
    }
  }
};
</script>

<style>
</style>
