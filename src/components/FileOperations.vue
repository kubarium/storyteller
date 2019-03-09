<template>
  <v-menu open-on-hover offset-y>
    <v-btn slot="activator" flat>File
      <v-icon>arrow_drop_down</v-icon>
    </v-btn>

    <v-list dense>
      <v-list-tile @click="$store.commit('toggleDropbox', {toggle:true,mode:'markdown'})">
        <v-list-tile-content>
          <v-list-tile-title>Open</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-avatar>
          <v-icon>cloud</v-icon>
        </v-list-tile-avatar>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('saveMarkdown')" :disabled="isMarkdownOpen || !modified">
        <v-list-tile-content>
          <v-list-tile-title>Save</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-avatar>
          <v-icon>save</v-icon>
        </v-list-tile-avatar>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('deleteFromDropbox')" :disabled="isMarkdownOpen">
        <v-list-tile-content>
          <v-list-tile-title>Delete</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-avatar>
          <v-icon>delete_forever</v-icon>
        </v-list-tile-avatar>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('revertMarkdown')" :disabled="isMarkdownOpen">
        <v-list-tile-content>
          <v-list-tile-title>Revert</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-avatar>
          <v-icon>settings_backup_restore</v-icon>
        </v-list-tile-avatar>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "file-operations",
  computed: {
    isMarkdownOpen() {
      return this.$store.state.markdown.path.length === 0;
    },
    modified() {
      return this.$store.state.markdown.modified;
    }
  }
};
</script>

<style>
</style>
