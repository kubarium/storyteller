<template>
  <v-container fluid grid-list-md>
    <v-layout column>
      <v-layout row wrap>
        <v-flex md12>
          <file-operations />
        </v-flex>

        <v-flex sm12 md5 lg5 xl7 fill-height>
          <h2>Source</h2>
          <content-operations type="layout" />
          <content-operations type="basic" />
          <content-operations type="table" />
          <markdown />
        </v-flex>
        <v-flex sm12 md7 lg7 xl5 fill-height>
          <h2>Preview</h2>
          <preview />
        </v-flex>
        <!-- </v-layout>
        </v-container> -->
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import FileOperations from "@/components/FileOperations.vue";
import ContentOperations from "@/components/ContentOperations.vue";
import Preview from "@/components/Preview.vue";
import Markdown from "@/components/Markdown.vue";

export default {
  name: "home",
  components: {
    FileOperations,
    ContentOperations,
    Preview,
    Markdown
  }
};
</script>

<style lang="scss">
</style>
