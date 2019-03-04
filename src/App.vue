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
@mixin box-shadow() {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
main {
  height: 100vh;
}
.renderer {
  height: 70vh;
  overflow-y: scroll;
  @include box-shadow();
}

.CodeMirror {
  height: 70vh;
  @include box-shadow();
}
</style>
