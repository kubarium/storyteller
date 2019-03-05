<template>
  <v-toolbar dark dense>
    <v-toolbar-title>Preview</v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items>
      <v-btn @click="$store.dispatch('saveMarkdown')" icon :disabled="isMarkdownOpen || !modified">
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn @click="$store.dispatch('deleteFromDropbox')" icon :disabled="isMarkdownOpen">
        <v-icon>delete_forever</v-icon>
      </v-btn>

      <v-tooltip bottom>
        <template slot="activator">
          <v-btn @click="$store.dispatch('revertMarkdown')" icon :disabled="isMarkdownOpen">
            <v-icon>settings_backup_restore</v-icon>
          </v-btn>
        </template>
        <span>Revert</span>
      </v-tooltip>

      <v-btn @click="$store.dispatch('publishMarkdown')" icon :disabled="isMarkdownOpen">
        <v-icon>picture_as_pdf</v-icon>
      </v-btn>
      <v-divider vertical></v-divider>

      <v-btn @click="$store.dispatch('newMarkdown')" flat>
        <v-icon>fiber_new</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "preview-operations",
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
