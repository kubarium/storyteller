<template>
  <v-app>
    <v-toolbar app dense>
      <v-toolbar-title class="headline text-uppercase">
        <span>Storyteller</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!--  {{
      $store.state.markdown.path || "Create or open a file"
      }}-->
      <dropbox-files/>
    </v-toolbar>

    <v-content>
      <!-- <Home /> -->
      <router-view/>
    </v-content>
    <link :href="`${publicPath}styles/${$store.getters.activeStyle}.css`" rel="stylesheet">
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
      publicPath: process.env.BASE_URL
    };
  }
};
</script>

<style lang="scss">
@import "./styles/storyteller.scss";

main {
  height: 100vh;
}
.renderer {
  height: 80vh;
  overflow-y: scroll;
  @include box-shadow();
}
</style>
