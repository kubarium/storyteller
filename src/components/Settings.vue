<template>
  <v-dialog v-model="$store.state.settings.dialog" width="500" scrollable>
    <v-btn icon slot="activator">
      <v-icon>settings</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>Settings</v-card-title>

      <v-divider/>

      <v-card-text style="height:300px">
        <v-sheet>
          <v-text-field
            solo
            label="Dropbox Access Token"
            v-model="$store.state.settings.dropboxAccessToken"
            @input="$store.dispatch('updateDropboxAccessToken',$event)"
          />
          <v-text-field
            solo
            label="Merriam Thesaurus API Key"
            v-model="$store.state.settings.thesaurusAPIKey"
            @input="$store.dispatch('updateThesaurusAPIKey',$event)"
          />
        </v-sheet>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <span>Changes are automatically saved.</span>
        <v-spacer/>
        <v-btn color="primary" flat @click="$store.commit('toggleSettings', false)">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "settings",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("loadSettings");
  }
};
</script>

<style>
</style>
