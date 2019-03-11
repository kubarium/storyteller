<template>
  <v-container class="renderer" @scroll.passive="updatePreviewPagination">
    <div
      class="pages"
      :class="[
        $store.getters.activeSize
      ]"
      v-html="$store.state.preview.content"
    />
  </v-container>
</template>

<script>
export default {
  name: "preview",
  methods: {
    updatePreviewPagination(event) {
      this.$store.commit(
        "updatePreviewPagination",
        Math.floor(event.target.scrollTop / 1064)
      );
    }
  }
};
</script>
