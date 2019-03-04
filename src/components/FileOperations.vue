<template>
  <v-toolbar
    dark
    dense
  >
    <v-toolbar-title>{{$store.state.file.markdown.path || "Create or open a file"}}</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>

      <v-btn
        @click="$store.dispatch('saveMarkdown')"
        icon
        :disabled="$store.state.file.markdown.path.length===0 || !$store.state.file.markdown.modified"
      >
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn
        @click="$store.dispatch('deleteCurrentMarkdown')"
        icon
        :disabled="$store.state.file.markdown.path.length===0"
      >
        <v-icon>delete_forever</v-icon>
      </v-btn>

      <v-tooltip bottom>
        <template slot="activator">
          <v-btn
            @click="$store.dispatch('revertMarkdown')"
            icon
            :disabled="$store.state.file.markdown.path.length===0"
          >
            <v-icon>settings_backup_restore</v-icon>
          </v-btn>
        </template>
        <span>Revert</span>
      </v-tooltip>

      <v-btn
        @click="$store.dispatch('publishMarkdown')"
        icon
        :disabled="$store.state.file.markdown.path.length===0"
      >
        <v-icon>picture_as_pdf</v-icon>
      </v-btn>
      <v-divider vertical></v-divider>

      <v-btn
        @click="$store.dispatch('newMarkdown')"
        flat
      >
        <v-icon>fiber_new</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "file-operations"
};
</script>

<style>
</style>
