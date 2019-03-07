<template>
  <v-app>
    <v-toolbar app dense>
      <v-toolbar-title class="headline text-uppercase">
        <span>Storyteller</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      {{$store.state.markdown.path}}
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
    <link
      :href="`${publicPath}styles/${$store.getters.activeStyle}/${$store.getters.activeStyle}.css?v=${$store.state.preview.styleVersion}`"
      rel="stylesheet"
    >
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
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
</style>
