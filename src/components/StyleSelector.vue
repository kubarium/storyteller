<template>
  <v-menu open-on-hover offset-y>
    <v-btn slot="activator" flat>Styles
      <v-icon>arrow_drop_down</v-icon>
    </v-btn>

    <v-list dense>
      <v-list dense>
        <v-list-tile
          v-for="style in $store.state.preview.styles"
          :key="style.name"
          @click="applyStyle(style.name)"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ style.name }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-avatar v-if="style.active">
            <v-icon>done</v-icon>
          </v-list-tile-avatar>
        </v-list-tile>
      </v-list>
    </v-list>
  </v-menu>
</template>

<script>
//
export default {
  name: "style-selector",
  props: ["type"],
  methods: {
    applyStyle(style) {
      this.$store.dispatch("applyStyle", style);
    }
  }
};
</script>

<style>
</style>
