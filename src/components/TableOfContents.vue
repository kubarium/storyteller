<template>
  <v-dialog
    v-model="$store.state.preview.toc"
    class="toc"
    scrollable
    :max-width="width"
  >
    <v-card>
      <v-card-title>Table of Contents</v-card-title>
      <v-card-text style="height:480px">
        <v-treeview :items="TOC" open-on-click hoverable open-all>
          <template slot="label" slot-scope="{ item }">
            <div
              class="table-of-contents-item"
              @click="scrollToHeader(item.scrollTop)"
            >
              <span>
                {{ item.name }}
              </span>
              <span>
                {{ item.scrollTop }}
              </span>
            </div>
          </template>
        </v-treeview>
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
      const h1 = Array.from(document.querySelectorAll(".pages h1"));
      const h2 = Array.from(document.querySelectorAll(".pages h2"));
      //const h3 = Array.from(document.querySelectorAll(".pages h3"));

      const headers = h1
        .concat(h2)
        .sort((a, b) =>
          a.parentElement.offsetTop > b.parentElement.offsetTop
            ? 1
            : a.parentElement.offsetTop < b.parentElement.offsetTop
            ? -1
            : 0
        )
        .reduce((result, header) => {
          if (header.nodeName === "H1") {
            return result.concat([
              {
                children: [],
                name: header.textContent,
                scrollTop: header.parentElement.offsetTop
              }
            ]);
          } else {
            result[result.length - 1]["children"].push({
              name: header.textContent,
              scrollTop: header.parentElement.offsetTop,
              pageNumber: getComputedStyle(
                header.parentElement.querySelector(`.pageNumber.auto`),
                ":after"
              ).getPropertyValue("content")
            });

            console.log(
              getComputedStyle(
                header.parentElement.querySelector(`.pageNumber.auto`),
                ":after"
              ).getPropertyValue("counter")
            );

            return result;
          }
        }, []);

      return headers;
    },
    scrollToHeader(scrollTop) {
      this.$store.commit("toggleTOC", false);
      this.$store.commit("scrollToHeader", scrollTop);
    }
  }
};
</script>

<style lang="scss" scoped>
.table-of-contents-item {
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
}
</style>
