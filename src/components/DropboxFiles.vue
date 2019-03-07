<template>
  <v-dialog
    v-model="$store.state.dropbox.dialog"
    width="500"
    scrollable
    @input="$store.dispatch('refreshEntries')"
  >
    <!-- <v-btn slot="activator" flat>Dropbox</v-btn> -->
    <v-card>
      <v-card-title>Your Dropbox Files
        <v-spacer/>
        <v-btn icon flat @click="$store.dispatch('refreshEntries')">
          <v-icon>refresh</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider/>
      <v-breadcrumbs :items="$store.state.dropbox.breadcrumbs">
        <template slot="item" slot-scope="props">
          <a @click="clickEntry(props.item)">{{ props.item.text }}</a>
        </template>
      </v-breadcrumbs>
      <v-divider/>
      <v-card-text style="height:300px">
        <v-list>
          <template v-for="(entry, index) in $store.state.dropbox.entries">
            <v-list-tile
              :disabled="$store.state.dropbox.fetching"
              :key="entry.title"
              @click="clickEntry(entry)"
            >
              <v-list-tile-avatar>
                <v-icon v-if="entry['.tag'] === 'folder'">folder</v-icon>
                <v-icon v-else-if="entry['.tag'] === 'parent'">arrow_upward</v-icon>
                <v-icon v-else>edit</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="entry.name"></v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn
                  :disabled="$store.state.dropbox.fetching"
                  icon
                  @click.stop="
                    $store.dispatch('deleteFromDropbox', entry.path_lower)
                  "
                >
                  <v-icon v-if="entry['.tag'] === 'file'">delete_forever</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>

            <v-divider v-show="index < $store.state.dropbox.entries.length - 1" :key="index"></v-divider>
          </template>
        </v-list>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="$store.commit('toggleDropbox', false)">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  methods: {
    clickEntry(entry) {
      console.log(entry);
      if (this.$store.getters.isParent(entry)) {
        return this.$store.dispatch("getEntries", entry.path_lower);
      }

      if (this.$store.getters.isFolder(entry)) {
        return this.$store.dispatch("getEntries", entry.path_lower);
      }

      if (this.$store.getters.isMarkdown(entry)) {
        return this.$store.dispatch("openMarkdown", entry.path_lower);
      }
    }

    /*  getEntryType(entry) {
      return entry[".tag"];
    }, */
  },
  created() {
    this.$store
      .dispatch("connectDropbox")
      .then(() => this.$store.dispatch("getEntries", ""));
  }
};
</script>

<style>
</style>
