<template>
  <v-container fluid grid-list-md>
    <v-layout column>
      <v-layout row wrap>
        <!-- <v-flex md12></v-flex> -->
        <v-flex sm12 md5 lg5 xl7 fill-height>
          <markdown-operations/>
          <markdown/>
        </v-flex>
        <v-flex sm12 md7 lg7 xl5 fill-height>
          <preview-operations/>
          <preview/>
        </v-flex>
        <!-- </v-layout>
        </v-container>-->
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
