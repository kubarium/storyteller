<template>
  <v-dialog
    v-model="dialog"
    width="500"
    scrollable
  >
    <v-btn
      slot="activator"
      flat
    >
      Dropbox Files
    </v-btn>

    <v-card>
      <v-card-title>
        Your Dropbox Files
      </v-card-title>
      <v-divider />
      <v-breadcrumbs :items="breadcrumbs">
        <template
          slot="item"
          slot-scope="props"
        >
          <!-- <a :href="props.item.href">{{ props.item.text }}</a> -->
          <span @click="getEntries(props.item.path)">{{props.item.text}}</span>
        </template>
      </v-breadcrumbs>
      <v-divider />
      <v-card-text>
        <v-list>
          <template v-for="(entry, index) in entries">

            <v-list-tile
              :key="entry.title"
              @click="getEntries(entry.path_lower)"
            >
              <v-list-tile-avatar>
                <v-icon v-if="entry['.tag']==='folder'">folder</v-icon>
                <v-icon v-else-if="entry['.tag']==='parent'">arrow_upward</v-icon>
                <v-icon v-else>edit</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="entry.name"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider
              v-show="index < entries.length - 1"
              :key="index"
            ></v-divider>
          </template>
        </v-list>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          flat
          @click="dialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Dropbox from "dropbox";

export default {
  data() {
    return {
      dialog: false,
      dbx: null,
      path: "",
      entries: null,
      breadcrumbs: []
    };
  },
  methods: {
    getEntries(path) {
      //console.log(evt);
      this.path = path;

      const breadcrumbsPath = this.path.split("/").reduce((a, b, index) => {
        return index > 0 ? a.concat(`${a[index - 1]}/${b}`) : a.concat(b);
      }, []);
      this.breadcrumbs = this.path.split("/").map((path, index) => {
        return {
          text: path,
          path: breadcrumbsPath[index]
        };
      });
      this.dbx
        .filesListFolder({ path })
        .then(response => this.fileTree(response.entries))
        .catch(error => console.error(error));
    },
    fileTree(entries) {
      this.entries = entries.filter(entry => {
        if (entry[".tag"] === "folder") {
          return true;
        }
        if (RegExp(/\.(.*?)$/).exec(entry.name)[1] === "md") {
          return true;
        }
        return false;
      });

      if (this.path !== "") {
        //console.log(this.path.replace(RegExp(/\/.*?$/), ""));
        this.entries.unshift({
          name: "Go up",
          ".tag": "parent",
          path_lower: this.path.replace(RegExp(/\/\w*$/g), "")
        });
      }

      console.log(entries);
    },
    initialize() {}
  },
  created() {
    this.dbx = new Dropbox.Dropbox({
      accessToken: process.env.VUE_APP_DROPBOX_ACCESS_TOKEN
    });
    this.getEntries(this.path);
  }
};
</script>

<style>
</style>
