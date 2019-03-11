<template>
  <codemirror
    ref="cm"
    class="source"
    :options="cmOptions"
    :value="$store.state.markdown.content"
    @changes="$store.dispatch('updatePreview')"
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
  mounted() {
    window.codemirror = this.codemirror;
    this.$store.dispatch("updatePreview");
  },
  computed: {
    codemirror() {
      return this.$refs.cm.codemirror;
    },
    cmOptions() {
      return {
        tabSize: 4,
        mode: { name: "text/x-markdown" },
        lineNumbers: true,
        lineWrapping: this.$store.state.codemirror.lineWrapping,
        line: true,
        theme: "monokai",
        extraKeys: {
          "Cmd-B": this.makeBold,
          "Ctrl-B": this.makeBold,
          "Cmd-I": this.makeItalic,
          "Ctrl-I": this.makeItalic
        },
        styleActiveLine: true

        //readOnly: this.$store.state.markdown.path == ""
      };
    }
  }
};
</script>

<style lang="scss">
@import "../styles/storyteller.scss";

.CodeMirror {
  height: 80vh;
  @include box-shadow();
}
</style>

