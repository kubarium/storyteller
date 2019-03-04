<template>
  <v-toolbar dark dense>
    <v-toolbar-title>{{
      $store.state.file.markdown.path || "Create or open a file"
    }}</v-toolbar-title>
    <v-spacer />
    <content-operations type="layout" />
    <content-operations type="basic" />
    <content-operations type="table" />
    <v-toolbar-items>
      <v-btn
        @click="$store.dispatch('saveMarkdown')"
        icon
        :disabled="isMarkdownOpen || !modified"
      >
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn
        @click="$store.dispatch('deleteCurrentMarkdown')"
        icon
        :disabled="isMarkdownOpen"
      >
        <v-icon>delete_forever</v-icon>
      </v-btn>

      <v-tooltip bottom>
        <template slot="activator">
          <v-btn
            @click="$store.dispatch('revertMarkdown')"
            icon
            :disabled="isMarkdownOpen"
          >
            <v-icon>settings_backup_restore</v-icon>
          </v-btn>
        </template>
        <span>Revert</span>
      </v-tooltip>

      <v-btn
        @click="$store.dispatch('publishMarkdown')"
        icon
        :disabled="isMarkdownOpen"
      >
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
import ContentOperations from "@/components/ContentOperations.vue";
export default {
  name: "file-operations",
  components: {
    ContentOperations
  },
  computed: {
    isMarkdownOpen() {
      return this.$store.state.file.markdown.path.length === 0;
    },
    modified() {
      return this.$store.state.file.markdown.modified;
    }
  }
};
</script>

<style>
</style>
