<template>
  <v-menu open-on-hover offset-y>
    <v-btn slot="activator" flat>Print
      <v-icon>arrow_drop_down</v-icon>
    </v-btn>

    <v-list dense>
      <v-list-tile @click="$store.dispatch('publishMarkdown', false)">
        <v-list-tile-content>
          <v-list-tile-title>Show No Mercy</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-avatar>
          <v-icon>invert_colors</v-icon>
        </v-list-tile-avatar>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('publishMarkdown', true)">
        <v-list-tile-content>
          <v-list-tile-title>Ink Friendly</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-avatar>
          <v-icon>format_color_reset</v-icon>
        </v-list-tile-avatar>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "print-operations"
};
</script>

<style>
</style>
