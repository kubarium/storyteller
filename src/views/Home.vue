<template>
  <v-container fluid>
    <v-layout
      row
      wrap
    >
      <v-flex md12>
        <file-operations />
      </v-flex>
      <v-flex md4>
        <v-container>
          <v-layout column>
            <h2>Source</h2>
            <textarea
              focus
              class="textarea"
              :disabled="$store.state.markdown.saving"
              :value="$store.state.markdown.content"
              @input="$store.commit('updateMarkdown',$event.target.value)"
            />
            </v-layout>
        </v-container>
      </v-flex>
      <v-flex md8>
        <v-container>
          <v-layout column>
            <h2>Preview</h2>
            <img :src="`${publicPath}zibar.jpg`">

            <preview :css="$store.state.style"/>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    <link ref="stylesheet"  :href="`${publicPath}${$store.state.styleSheet}`"/>
</v-container>
</template>

<script>
// @ is an alias to /src
import FileOperations from "@/components/FileOperations.vue";
import Preview from "@/components/Preview.vue";

export default {
  name: "home",
  components: {
    FileOperations,
    Preview
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  }
};
</script>

<style lang="scss" scoped>
@mixin box-shadow() {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.textarea {
  min-height: 500px;
  resize: none;
  background: white;
  @include box-shadow();
}
</style>
