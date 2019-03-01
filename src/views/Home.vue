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
          fill-height
        >
          <h2>Source</h2>
          <content-operations type="layout" />
          <content-operations type="basic" />
          <content-operations type="table" />
          <!-- <textarea
            autofocus
            id="source"
            class="textarea"
            :disabled="$store.state.file.markdown.saving"
            :value="$store.state.file.markdown.content"
            @input="$store.commit('updateMarkdown',$event.target.value)"
          ></textarea> -->
          <codemirror
            ref="cm"
            :options="cmOptions"
            :value="$store.state.file.markdown.content"
            @input="updateMarkdown"
            @focus="focus"
            @cursorActivity="updateCursor"
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
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";

export default {
  name: "home",
  components: {
    FileOperations,
    ContentOperations,
    Preview,
    codemirror
  },
  methods: {
    focus(codemirror) {
      //console.log(codemirror.getCursor());
    },
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
        mode: "text/x-markdowm",
        theme: "base16-dark",
        lineNumbers: true,
        lineWrapping: true,
        line: true,
        highlightFormatting: true,
        extraKeys: {
          "Cmd-B": this.makeBold,
          "Ctrl-B": this.makeBold,
          "Cmd-I": this.makeItalic,
          "Ctrl-I": this.makeItalic
        }
        // more codemirror options, 更多 codemirror 的高级配置...
      },
      publicPath: process.env.BASE_URL
    };
  },
  mounted() {
    this.$store.commit("registerCodeMirror", this.codemirror);
  },
  computed: {
    codemirror() {
      return this.$refs.cm.codemirror;
    }
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
