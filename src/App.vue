<template>
  <v-app>
    <v-toolbar app dense>
      <v-toolbar-title class="headline text-uppercase">
        <span>Storyteller</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <transition name="fade">
        <v-chip color="teal" text-color="white" v-if="$store.state.markdown.saving">Saved
          <v-icon right>check_circle</v-icon>
        </v-chip>
      </transition>
      <v-chip label v-show="$store.state.markdown.path">{{ $store.state.markdown.path }}</v-chip>
      <dropbox-files/>
      <!-- <image-selector/> -->
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
    <link
      :href="
        `${publicPath}styles/${$store.getters.activeStyle}/${
          $store.getters.activeStyle
        }.css?v=${$store.state.preview.styleVersion}`
      "
      rel="stylesheet"
    >
  </v-app>
</template>

<script>
import DropboxFiles from "@/components/DropboxFiles";
/* import ImageSelector from "@/components/ImageSelector"; */
export default {
  name: "App",
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  },
  components: {
    DropboxFiles
    /* ImageSelector */
  }
};
</script>

<style lang="scss">
@import "./styles/storyteller.scss";

.renderer {
  height: 80vh;
  overflow-y: scroll;
  @include box-shadow();
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
