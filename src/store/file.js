import md from "markdown-it";
export default {
  state: {
    dialog: false,
    markdown: {
      path: "",
      content: "",
      modified: false,
      saving: false
    },
    preview: "",
    style: "default",
    styleSheet: "default.css"
  },
  mutations: {
    changePreviewStyle(state, style) {
      state.style = style;
      state.styleSheet = `${style}.css`;
    },
    updateMarkdown(state, value) {
      state.markdown.content = value;
      state.markdown.modified = true;

      let markdown = md({ html: true, linkify: true }).render(value);

      state.preview = markdown
        .split("~page")
        .map(page => `<div class="page">${page}</div>`)
        .join("");
    },
    resetApplication(state) {
      state.markdown.path = "";
      state.markdown.content = "";
      state.markdown.modified = false;
      state.markdown.saving = false;
    }
  },
  actions: {
    openMarkdown({ state, rootState, commit }, path) {
      if (path) {
        state.markdown.path = path;
      }
      rootState.dropbox.dbx
        .filesDownload({ path: state.markdown.path })
        .then(response => {
          var reader = new FileReader();
          reader.addEventListener("loadend", () => {
            commit("updateMarkdown", reader.result);
            state.dialog = false;
          });
          reader.readAsText(response.fileBlob);
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    deleteCurrentMarkdown({ state, rootState, commit }) {
      rootState.dropbox.dbx
        .filesDelete({ path: state.markdown.path })
        .then(() => {
          commit("resetApplication");
        });
    },
    deleteMarkdown({ state }, path) {
      state.dbx.filesDelete({ path: path });
    },
    revertMarkdown({ dispatch }) {
      dispatch("openMarkdown");
    },
    saveMarkdown({ state, rootState }) {
      state.markdown.saving = true;
      state.markdown.modified = false;
      rootState.dropbox.dbx
        .filesUpload({
          path: state.markdown.path,
          contents: state.markdown.content,
          mode: {
            ".tag": "overwrite"
          },
          autorename: true
        })
        .then(metadata => console.log(metadata))
        .catch(console.error);
    }
  }
};
