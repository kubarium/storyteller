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

        <v-flex
          sm12
          md5
          lg5
          xl7
          fill-height
        >
          <h2>Source</h2>
          <content-operations type="layout" />
          <content-operations type="basic" />
          <content-operations type="table" />
          <codemirror
            ref="cm"
            :options="cmOptions"
            :value="$store.state.file.markdown.content"
            @input="updateMarkdown"
            @cursorActivity="updateCursor"
            class="textarea"
          />
        </v-flex>
        <v-flex
          sm12
          md7
          lg7
          xl5
          fill-height
        >
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
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/theme/monokai.css";
import "codemirror/addon/search/search";
import "codemirror/addon/search/searchcursor";
import "codemirror/addon/search/jump-to-line";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/dialog/dialog.js";

export default {
  name: "home",
  components: {
    FileOperations,
    ContentOperations,
    Preview,
    codemirror
  },
  methods: {
    updateCursor() {
      this.$store.commit("updateCursor", this.codemirror.getCursor());
    },
    updateMarkdown(value) {
      this.$store.commit("updateMarkdown", value);
    },
    makeBold() {
      this.codemirror.replaceSelection(
        "**" + this.codemirror.getSelection() + "**",
        "around"
      );
    },
    makeItalic() {
      this.codemirror.replaceSelection(
        "*" + this.codemirror.getSelection() + "*",
        "around"
      );
    }
  },
  data() {
    return {
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: { name: "text/x-markdown" },
        lineNumbers: true,
        lineWrapping: true,
        line: true,
        extraKeys: {
          "Cmd-B": this.makeBold,
          "Ctrl-B": this.makeBold,
          "Cmd-I": this.makeItalic,
          "Ctrl-I": this.makeItalic
        }
      },
      publicPath: process.env.BASE_URL
    };
  },
  mounted() {
    this.$store.commit("updateMarkdown", "");
    this.$store.commit("registerCodeMirror", this.codemirror);
  },
  computed: {
    codemirror() {
      return this.$refs.cm.codemirror;
    }
  }
};
</script>

<style lang="scss">
@mixin box-shadow() {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.CodeMirror {
  height: 70vh;
  @include box-shadow();
}
</style>
