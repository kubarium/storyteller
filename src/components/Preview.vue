<template>
  <v-container class="renderer" @scroll.passive="updatePreviewPagination">
    <div :class="'default'" v-html="$store.state.markdown.preview"/>
  </v-container>
  <!-- <div>
  </div>-->
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
