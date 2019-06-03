<template>
  <v-app>
    <v-toolbar class="app-toolbar" dense>
      <v-toolbar-title class="headline text-uppercase">
        <span>Storyteller</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <transition name="fade">
        <v-chip
          color="teal"
          text-color="white"
          v-if="$store.state.markdown.saving"
        >
          Saved
          <v-icon right>check_circle</v-icon>
        </v-chip>
        <v-chip
          color="red"
          text-color="white"
          v-if="$store.state.markdown.modified"
        >
          Edited
          <v-icon right>priority_high</v-icon>
        </v-chip>
      </transition>
      <v-chip label v-show="$store.state.markdown.path">{{
        $store.state.markdown.path
      }}</v-chip>
      <v-divider vertical />
      <settings />
      <dropbox-files />
      <thesaurus />
      <table-of-contents />
      <!-- <image-selector/> -->
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
    <link
      :disabled="$store.state.preview.useCustomStyle"
      :href="
        `${publicPath}styles/${$store.getters.activeStyle}/${
          $store.getters.activeStyle
        }.css?v=${$store.state.preview.styleVersion}`
      "
      rel="stylesheet"
    />

    <v-style :disabled="!$store.state.preview.useCustomStyle">{{
      $store.state.preview.customStyle
    }}</v-style>
  </v-app>
</template>

<script>
import DropboxFiles from "@/components/DropboxFiles";
import Thesaurus from "@/components/Thesaurus";
import Settings from "@/components/Settings";
import TableOfContents from "@/components/TableOfContents";
/* import ImageSelector from "@/components/ImageSelector"; */

export default {
  name: "App",
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  },
  components: {
    DropboxFiles,
    Settings,
    Thesaurus,
    TableOfContents
    /* ImageSelector */
  },
  mounted() {
    document.querySelector(".pages").addEventListener("dblclick", () => {
      this.$store.dispatch("applyStyle", this.$store.getters.activeStyle);
    });
  }
};
</script>

<style lang="scss">
@import "./styles/storyteller.scss";
:fullscreen .app-toolbar {
  display: none;
}
:fullscreen .app-content {
  padding: initial;
}
.renderer {
  height: 82vh;
  overflow-y: hidden;
  @include box-shadow();
}
:fullscreen .renderer {
  height: 95vh;
}
.scrollY {
  overflow-y: scroll;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
