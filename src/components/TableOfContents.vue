<template>
  <v-dialog
    v-model="$store.state.preview.toc"
    class="toc"
    scrollable
    :max-width="width"
  >
    <v-card>
      <v-card-title>Table of Contents</v-card-title>
      <v-card-text class="pa-0" style="height:480px">
        <v-list dense>
          <template v-for="(entry, index) in TOC">
            <v-divider :key="index" />
            <v-list-tile :key="`entry-${index}`">
              <v-list-tile-content>
                <a @click="scrollToHeader(entry.scrollTop)">{{
                  entry.textContent
                }}</a>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" flat @click="$store.commit('toggleTOC', false)"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "table-of-contents",
  data() {
    return {
      TOC: [],
      width:
        document.body.offsetWidth < 1600
          ? "60vw"
          : document.body.offsetWidth < 2000
          ? "40vw"
          : "20vw"
    };
  },
  beforeUpdate() {
    this.TOC = this.updateTOC();
  },
  mounted() {
    this.TOC = this.updateTOC();
  },
  methods: {
    updateTOC() {
      return Array.from(document.querySelectorAll(".pages h1")).map(header => {
        //console.log(header.parentElement);
        return {
          header,
          textContent: header.textContent,
          scrollTop: header.parentElement.offsetTop
        };
      });
    },
    scrollToHeader(scrollTop) {
      this.$store.commit("toggleTOC", false);
      this.$store.commit("scrollToHeader", scrollTop);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
