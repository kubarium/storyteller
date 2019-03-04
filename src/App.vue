<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Storyteller</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat>
        <span class="mr-2">Stories</span>
      </v-btn>
      <!-- <v-btn
        flat
        to="/dropbox"
      >
        <span class="mr-2">Dropbox</span>
      </v-btn> -->
      <dropbox-files />
    </v-toolbar>

    <v-content>
      <!-- <Home /> -->
      <router-view />
    </v-content>

  </v-app>
</template>

<script>
//import Home from "./views/Home";
import DropboxFiles from "./components/DropboxFiles";

export default {
  name: "App",
  components: {
    DropboxFiles
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style lang="scss">
main {
  height: 100vh;
}
</style>
