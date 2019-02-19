<template>
  <div class="renderer">
    <div
      :class="'default'"
      v-html="$store.state.preview"
    />
  </div>
</template>

<script>
export default {
  name: "preview",
  props: {
    css: { type: String }
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
.renderer {
  overflow-y: scroll;
  height: 100ch;
}
@import "../styles/default.scss";
</style>
