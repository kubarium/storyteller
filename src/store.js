import Vue from "vue";
import Vuex from "vuex";
//import markdown from "markdown/lib/markdown";
import md from "markdown-it";
import Dropbox from "dropbox";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dbx: null,
    markdown: {
      path: "",
      content: "",
      modified: false,
      saving: false
    },
    preview: "",
    style: "default"
  },
  mutations: {
    changePreviewStyle(state, style) {
      state.style = `${process.env.BASE_URL}${style}`;
    },
    openMarkdown(state, path) {
      state.markdown.path = path;
    },
    updateMarkdown(state, value) {
      state.markdown.content = value;
      state.markdown.modified = true;
      //state.preview = markdown.toHTML(state.markdown);
      state.preview = md({html: true, linkify: true}).render(state.markdown.content);
    }
  },
  actions: {
    connectDropbox({state}) {
      return new Promise((resolve) => {
        state.dbx = new Dropbox.Dropbox({accessToken: process.env.VUE_APP_DROPBOX_ACCESS_TOKEN});
        resolve();
      })
    },
    saveMarkdown({
      state
    }, path) {
      state.markdown.saving = true;
      state.markdown.modified = false;
      state
        .dbx
        .filesUpload({
          path: state.markdown.path,
          contents: state.markdown.content,
          mode: {
            ".tag": "overwrite"
          },
          autorename: true
        })
        .then(metadata => console.log(metadata))
        .catch(console.error)

    }
  }
});
