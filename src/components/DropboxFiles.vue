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
      <v-breadcrumbs
        :items="breadcrumbs"
        v-show="!isRoot()"
      >
        <template
          slot="item"
          slot-scope="props"
        >
          <!-- <a :href="props.item.href">{{ props.item.text }}</a> -->
          <a @click="clickEntry(props.item)">{{props.item.text}}</a>
        </template>
      </v-breadcrumbs>
      <v-divider v-show="!isRoot()" />
      <v-card-text>
        <v-list>
          <template v-for="(entry, index) in entries">

            <v-list-tile
              :key="entry.title"
              @click="clickEntry(entry)"
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
//import Dropbox from "dropbox";

export default {
  data() {
    return {
      dialog: false,
      path: "",
      entries: null,
      breadcrumbs: []
    };
  },
  methods: {
    clickEntry(entry) {
      console.log(entry);
      if (this.isFolder(entry)) {
        return this.getEntries(entry.path_lower);
      }

      if (this.isMarkdown(entry)) {
        this.$store.commit("openMarkdown", entry.path_lower);
        return this.openFile({ path: entry.path_lower });
      }
    },
    isFolder(entry) {
      return entry[".tag"] === "folder";
    },
    isParent(entry) {
      return entry[".tag"] === "parent";
    },
    isMarkdown(entry) {
      return RegExp(/\.(.*?)$/).exec(entry.name)[1] === "md";
    },
    isRoot() {
      return this.path === "";
    },
    getEntryType(entry) {
      return entry[".tag"];
    },
    crumble() {
      const breadcrumbsPath = this.path.split("/").reduce((a, b, index) => {
        return index > 0 ? a.concat(`${a[index - 1]}/${b}`) : a.concat(b);
      }, []);
      this.breadcrumbs = this.path.split("/").map((path, index) => {
        return {
          text: path,
          path: breadcrumbsPath[index]
        };
      });
    },
    openFile(path) {
      this.$store.state.dbx
        .filesDownload(path)
        .then(response => {
          var reader = new FileReader();
          reader.addEventListener("loadend", () => {
            this.$store.commit("updateMarkdown", reader.result);
            this.dialog = false;
          });
          reader.readAsText(response.fileBlob);
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    getEntries(path) {
      this.path = path;

      this.crumble();

      this.$store.state.file.dbx
        .filesListFolder({ path })
        .then(response => this.fileTree(response.entries))
        .catch(error => console.error(error));
    },
    fileTree(entries) {
      this.entries = entries.filter(entry => {
        if (this.isFolder(entry)) {
          return true;
        }
        if (this.isMarkdown(entry)) {
          return true;
        }
        return false;
      });

      if (!this.isRoot()) {
        this.entries.unshift({
          name: "Go up",
          ".tag": "parent",
          path_lower: this.path.replace(RegExp(/\/\w*$/g), "")
        });
      }
    }
  },
  created() {
    this.$store
      .dispatch("connectDropbox")
      .then(() => this.getEntries(this.path));
  }
};
</script>

<style>
</style>
