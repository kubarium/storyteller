<template>
  <v-menu
    open-on-hover
    offset-y
  >
    <v-btn
      slot="activator"
      color="primary"
      dark
    >
      {{type}}
    </v-btn>

    <v-list dense>
      <v-list dense>
        <v-list-tile
          v-for="item in $store.getters.operations(type)"
          :key="item"
          @click="applyOperation(item)"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item }}</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
      </v-list>
    </v-list>
  </v-menu>
</template>

<script>
//
export default {
  name: "content-operations",
  props: ["type"],
  methods: {
    actionCondenser(title) {
      return `add${title.split(" ").join("")}`;
    },
    applyOperation(item) {
      this.$store
        .dispatch("applyOperation", this.actionCondenser(item))
        .then(position => {
          /* var textarea = document.getElementById("source");

        textarea.focus();
        textarea.selectionStart = position;
        textarea.selectionEnd = position; */
        });
    }
  }
};
</script>

<style>
</style>
