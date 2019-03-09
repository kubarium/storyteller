<template>
  <v-dialog
    v-model="$store.state.dropbox.dialog"
    width="500"
    scrollable
    @input="$store.dispatch('refreshEntries')"
  >
    <v-card>
      <v-card-title>
        {{$store.state.dropbox.mode==="markdown" ? "Dropbox Files" : "Image Files" }}
        <v-spacer/>
        <v-btn-toggle
          mandatory
          v-model="$store.state.dropbox.sort"
          class="transparent"
          @change="$store.commit('sortDropboxEntries', $event)"
        >
          <v-btn flat :value="'name'">
            <v-icon>sort_by_alpha</v-icon>
          </v-btn>
          <v-btn flat :value="'date'">
            <v-icon>date_range</v-icon>
          </v-btn>
        </v-btn-toggle>
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
          <template v-for="(entry, index) in entries">
            <v-divider v-show="index > 0" :key="index"></v-divider>

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

              <v-list-tile-action v-if="entry['.tag'] === 'file'">
                <v-btn
                  :disabled="$store.state.dropbox.fetching"
                  icon
                  @click.stop="
                    $store.dispatch('deleteFromDropbox', entry.path_lower)
                  "
                >
                  <v-icon>delete_forever</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-text-field label="Filter" @click:clear="clearFilter($event)" clearable v-model="filter"/>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="$store.commit('toggleDropbox', {toggle:false})">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
//@input="$store.dispatch('filterEntries',$event)"
export default {
  name: "dropbox-files",
  data() {
    return {
      filter: ""
    };
  },
  computed: {
    entries() {
      if (this.filter != "")
        return this.$store.state.dropbox.entries.filter(entry =>
          RegExp(this.filter, "g").test(entry.name)
        );
      else return this.$store.state.dropbox.entries;
    }
  },
  filters: {
    entryFilter: function(entry) {
      console.log(entry);
      return entry;
    }
  },
  methods: {
    clearFilter(value) {
      console.log(this);
      this.filter = value;
    },
    clickEntry(entry) {
      //console.log(entry);
      if (this.$store.getters.isParent(entry)) {
        return this.$store.dispatch("getEntries", entry.path_lower);
      }

      if (this.$store.getters.isFolder(entry)) {
        return this.$store.dispatch("getEntries", entry.path_lower);
      }

      if (this.$store.getters.isMarkdown(entry)) {
        return this.$store.dispatch("openMarkdown", entry.path_lower);
      }

      if (this.$store.getters.isImage(entry)) {
        return this.$store.dispatch("addImage", entry.path_lower);
      }
    }
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
