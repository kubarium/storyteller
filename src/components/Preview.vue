<template>
  <v-container class="renderer" @scroll.passive="updatePreviewPagination">
    <div
      :class="[
        $store.getters.activeStyle,
        $store.getters.activeSize
      ]"
      v-html="$store.state.markdown.preview"
    />
  </v-container>
  <!-- <div>
  </div>-->
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
