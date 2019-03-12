<template>
  <v-menu open-on-hover offset-y :disabled="!$store.getters.isMarkdownOpen">
    <v-btn slot="activator" flat>Settings
      <v-icon>arrow_drop_down</v-icon>
    </v-btn>

    <v-list dense>
      <v-list-tile @click="$store.commit('toggleLineWrapping')">
        <v-list-tile-content>
          <v-list-tile-title>Wrap Lines</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-avatar v-if="$store.state.codemirror.lineWrapping">
          <v-icon>check_box</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-avatar v-else>
          <v-icon>check_box_outline_blank</v-icon>
        </v-list-tile-avatar>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
//
export default {
  name: "markdown-settings"
};
</script>

<style>
</style>
