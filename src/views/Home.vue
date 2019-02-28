<template>
  <v-container
    fluid
    grid-list-md
  >

    <v-layout column>
      <v-layout
        row
        wrap
      >

        <v-flex md12>
          <file-operations />
        </v-flex>
        <!-- <v-container
          fluid
          fill-height
        >

          <v-layout> -->

        <v-flex
          sm12
          md5
          lg5
          xl7
        >
          <h2>Source</h2>
          <content-operations type="layout" />
          <content-operations type="basic" />
          <content-operations type="table" />
          <textarea
            autofocus
            id="source"
            class="textarea"
            :disabled="$store.state.file.markdown.saving"
            :value="$store.state.file.markdown.content"
            @input="$store.commit('updateMarkdown',$event.target.value)"
          ></textarea>
        </v-flex>
        <v-flex
          sm12
          md7
          lg7
          xl5
        >
          <h2>Preview</h2>
          <preview class="preview" />
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

export default {
  name: "home",
  components: {
    FileOperations,
    ContentOperations,
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

.source,
.preview1 {
  display: grid;
  grid-template-rows: 1fr 100%;
  align-content: space-between;
}
.preview {
  /* min-height: 1095px; */
}
.textarea {
  width: 100%;
  height: 100ch;
  resize: none;
  background: white;
  @include box-shadow();
}
</style>
