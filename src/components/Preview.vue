<template>
  <!--   <v-container
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
  </v-container> -->
  <div
    class="renderer"
    @scroll.passive="updatePreviewPagination"
  >
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
.renderer {
  overflow-y: scroll;
  max-height: 70vh;
  /* height: 80vh; */
  /* height: calc(100ch - 120px); */
  /* 
  display: flex;
  flex-direction: column;
  align-items: center; */
}
@import "../styles/default.scss";
</style>
