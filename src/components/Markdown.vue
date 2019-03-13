<template>
  <v-container class="renderer pa-0">
    <codemirror
      ref="cm"
      class="source"
      :options="cmOptions"
      :value="$store.state.codemirror.initialValue"
      @changes="$store.dispatch('updatePreview')"
    />
  </v-container>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/theme/monokai.css";
import "codemirror/addon/search/search";
import "codemirror/addon/search/searchcursor";
import "codemirror/addon/search/jump-to-line";
import "codemirror/addon/selection/active-line";
import "codemirror/addon/selection/mark-selection";
import "codemirror/addon/scroll/scrollpastend";
import "codemirror/addon/scroll/simplescrollbars.css";
import "codemirror/addon/scroll/simplescrollbars";
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
    },
    contextmenu(cm, event) {
      var pos = cm.coordsChar({ left: event.clientX, top: event.clientY });
      var word = cm.getTokenAt(pos).string.replace(/[.,;!?]$/, "");
      this.$store.dispatch("getThesaurus", word);
    }
  },
  mounted() {
    window.codemirror = this.codemirror;
    this.codemirror.on("contextmenu", this.contextmenu);
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
        styleActiveLine: true,
        styleActiveSelected: true,
        scrollbarStyle: "simple",
        theme: "monokai",
        extraKeys: {
          "Cmd-B": this.makeBold,
          "Ctrl-B": this.makeBold,
          "Cmd-I": this.makeItalic,
          "Ctrl-I": this.makeItalic
        },
        readOnly: this.$store.getters.isMarkdownOpen ? false : "nocursor"
      };
    }
  }
};
</script>

<style lang="scss">
@import "../styles/storyteller.scss";
:fullscreen .CodeMirror {
  height: 95vh;
}
.CodeMirror {
  height: 82vh;

  @include box-shadow();
}
</style>

