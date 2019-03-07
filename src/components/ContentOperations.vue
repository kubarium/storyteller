<template>
  <v-menu open-on-hover offset-y>
    <v-btn slot="activator" flat>
      {{ type }}
      <v-icon>arrow_drop_down</v-icon>
    </v-btn>

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
      this.$store.dispatch("applyOperation", this.actionCondenser(item));
    }
  }
};
</script>

<style>
</style>
