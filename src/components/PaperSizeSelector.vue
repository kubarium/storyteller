<template>
  <v-menu open-on-hover offset-y>
    <v-btn slot="activator" flat>Size
      <v-icon>arrow_drop_down</v-icon>
    </v-btn>

    <v-list dense>
      <v-list-tile
        v-for="size in $store.state.preview.sizes"
        :key="size.code"
        @click="applySize(size.code)"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ size.name }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-avatar v-if="size.active">
          <v-icon>done</v-icon>
        </v-list-tile-avatar>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
//
export default {
  name: "paper-size-selector",
  props: ["type"],
  methods: {
    applySize(size) {
      this.$store.dispatch("applySize", size);
    }
  }
};
</script>
