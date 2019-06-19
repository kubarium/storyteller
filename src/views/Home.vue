<template>
  <v-container class="app-content" fluid grid-list-md>
    <v-layout column>
      <v-layout row wrap>
        <v-flex xs12 sm12 md5 lg5 xl7>
          <markdown-operations />
          <markdown />
        </v-flex>
        <v-flex xs12 sm12 md7 lg7 xl5>
          <preview-operations />
          <preview />
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import MarkdownOperations from "@/components/MarkdownOperations.vue";
import PreviewOperations from "@/components/PreviewOperations.vue";
import Preview from "@/components/Preview.vue";
import Markdown from "@/components/Markdown.vue";

export default {
  name: "home",
  components: {
    MarkdownOperations,
    PreviewOperations,
    Preview,
    Markdown
  }
};
</script>

<style lang="scss">
</style>
