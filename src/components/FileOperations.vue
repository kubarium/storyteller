<template>
  <v-toolbar
    dark
    dense
  >
    <v-toolbar-title>{{$store.state.markdown.path || "Create or open a file"}}</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>

      <v-btn
        @click="$store.dispatch('saveMarkdown')"
        icon
        :disabled="$store.state.markdown.path.length===0"
      >
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn
        @click="$store.commit('changePreviewStyle',`kubar.css`)"
        icon
        :disabled="$store.state.markdown.path.length===0"
      >
        <v-icon>delete_forever</v-icon>
      </v-btn>
      <v-btn
        @click="$store.dispatch('revertMarkdown')"
        icon
        :disabled="$store.state.markdown.path.length===0"
      >
        <v-icon>settings_backup_restore</v-icon>
      </v-btn>
      <v-btn
        @click="$store.dispatch('publishMarkdown')"
        icon
        :disabled="$store.state.markdown.path.length===0 || $store.state.markdown.modified"
      >
        <v-icon>publish</v-icon>
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
