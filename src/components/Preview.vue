<template>
  <v-container
    fill-height
    class="renderer"
  >
    <v-layout>
      <v-flex>
        <div
          :class="'default'"
          v-html="$store.state.file.preview"
        />
      </v-flex>
    </v-layout>
  </v-container>
  <!-- <div class="renderer"></div> -->
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
  outline: 1px solid red;
  /* height: calc(100vh - 128px);
  display: flex;
  flex-direction: column;
  align-items: center; */
}
@import "../styles/default.scss";
</style>
