import Vue from "vue";
import Vuex from "vuex";
//import markdown from "markdown/lib/markdown";
import md from "markdown-it";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    markdown: {
      path: "",
      content: ""
    },
    preview: ""
  },
  mutations: {
    updateMarkdown(state, value) {
      state.markdown.content = value;
      //state.preview = markdown.toHTML(state.markdown);
      state.preview = md({html: true, linkify: true}).render(state.markdown.content);
    }
  },
  actions: {
    fetchMarkdown(state, path) {
      console.log(path)
    }
  }
});
