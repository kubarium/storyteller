<template>
  <v-dialog
    v-model="$store.state.imageSettings.dialog"
    width="600"
    scrollable
    content-class="imageSettings"
    @input="$store.dispatch('refreshImages')"
  >
    <v-card>
      <v-card-title
        >Image Settings
        <!-- <v-spacer />
        <v-btn icon flat @click="$store.dispatch('refreshImages')">
          <v-icon>refresh</v-icon>
        </v-btn> -->
      </v-card-title>
      <v-divider />
      <!-- <v-breadcrumbs :items="$store.state.images.breadcrumbs">
        <template slot="item" slot-scope="props">
          <a @click="clickEntry(props.item)">{{ props.item.text }}</a>
        </template>
      </v-breadcrumbs>
      <v-divider /> -->
      <v-card-text style="height:500px">
        <!-- <v-list>
          <template v-for="(entry, index) in $store.state.images.entries">
            <v-divider v-show="index > 0" :key="index"></v-divider>

            <v-list-tile
              :disabled="$store.state.images.fetching"
              :key="entry.title"
              @click="clickEntry(entry)"
            >
              <v-list-tile-avatar>
                <v-icon v-if="entry['.tag'] === 'folder'">folder</v-icon>
                <v-icon v-else-if="entry['.tag'] === 'parent'"
                  >arrow_upward</v-icon
                >
                <v-icon v-else>image</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="entry.name"></v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action v-if="entry['.tag'] === 'file'">
                <v-btn
                  :disabled="$store.state.images.fetching"
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
        </v-list> -->
        <v-textarea
          :value="$store.state.imageSettings.url"
          label="Image URL"
          no-resize
        ></v-textarea>
        <v-select
          :items="modes"
          v-model="$store.state.imageSettings.styles['mix-blend-mode']"
          label="Blend Mode"
        ></v-select>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          flat
          @click="$store.commit('toggleImageSettings', false)"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
//normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|difference|exclusion|hue|saturation|color|luminosity
export default {
  name: "image-settings",
  data() {
    return {
      modes: "normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|difference|exclusion|hue|saturation|color|luminosity".split(
        "|"
      )
    };
  },
  methods: {
    clickEntry(entry) {
      console.log(entry);
      if (this.$store.getters.isParent(entry)) {
        return this.$store.dispatch("getEntries", entry.path_lower);
      }

      if (this.$store.getters.isFolder(entry)) {
        return this.$store.dispatch("getEntries", entry.path_lower);
      }

      if (this.$store.getters.isImage(entry)) {
        return this.$store.dispatch("addImage", entry.path_lower);
      }
    }
  },
  mounted() {
    //this.$store.dispatch("connectDropbox").then();
    //this.$store.dispatch("getImages", "");
  }
};
</script>


<style lang="scss" >
.imageSettings {
  position: absolute;
  left: 2%;
}
</style>
