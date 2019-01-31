import Vue from "vue";
import Vuex from "vuex";
//import markdown from "markdown/lib/markdown";
import md from "markdown-it";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    markdown: "",
    preview: ""
  },
  mutations: {
    updateMarkdown(state, value) {
      console.log(value);
      state.markdown = value;
      //state.preview = markdown.toHTML(state.markdown);
      state.preview = md({ html: true, linkify: true }).render(state.markdown);
    }
  },
  actions: {}
});
