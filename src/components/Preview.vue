<template>
  <div class="renderer" @scroll.passive="updatePreviewPagination">
    <div :class="'default'" v-html="$store.state.file.preview" />
  </div>
</template>

<script>
export default {
  name: "preview",
  props: {
    css: { type: String }
  },
  methods: {
    updatePreviewPagination(event) {
      this.$store.commit(
        "updatePreviewPagination",
        Math.floor(event.target.scrollTop / 1064)
      );
    }
  },
  watch: {
    css: function(newCSS, oldCSS) {
      console.log(oldCSS);
      console.log(newCSS);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/default.scss";
</style>
