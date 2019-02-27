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
          <layout-operations />
          <content-operations />
          <textarea
            autofocus
            id="source"
            class="textarea"
            :disabled="$store.state.markdown.saving"
            :value="$store.state.markdown.content"
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
import LayoutOperations from "@/components/LayoutOperations.vue";
import ContentOperations from "@/components/ContentOperations.vue";
import Preview from "@/components/Preview.vue";

export default {
  name: "home",
  components: {
    FileOperations,
    LayoutOperations,
    ContentOperations,
    Preview
  },
  methods: {
    insertAtCursor(injected = "") {
      //this is force updating the source textarea with the injected content

      var textarea = document.getElementById("source");

      var startPos = textarea.selectionStart;
      var endPos = textarea.selectionEnd;
      var currentValue = textarea.value;
      if (textarea.selectionStart || textarea.selectionStart == "0") {
        textarea.value =
          currentValue.substring(0, startPos) +
          injected +
          currentValue.substring(endPos, currentValue.length);
      } else {
        //if there is a selection, ignore it and append content
        textarea.value += injected;
      }
      //focus again at the end of injected content
      textarea.focus();
      textarea.selectionStart = startPos + injected.length;
      textarea.selectionEnd = startPos + injected.length;
    }
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
