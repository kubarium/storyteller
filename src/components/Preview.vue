<template>
  <div class="renderer">
    <div
      :class="'default'"
      v-html="$store.state.file.preview"
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
  height: 100%;
  display: flex;
  flex-direction: column;
  outline: 1px solid red;
  align-items: center;
  justify-content: center;
}
@import "../styles/default.scss";
</style>
