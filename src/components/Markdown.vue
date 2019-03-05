<template>
  <codemirror
    ref="cm"
    class="source"
    :options="cmOptions"
    :value="$store.state.markdown.content"
    @input="updateMarkdown"
    @cursorActivity="updateCursor"
  />
</template>

<script>
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
  name: "markdown",
  components: {
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
      }
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

<style lang="scss" scoped>
@import "../styles/storyteller.scss";

.source {
  height: 70vh;
  outline: 1px solid red;
  @include box-shadow();
}
</style>

