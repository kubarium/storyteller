import md from "markdown-it";
export default {
  state : {
    path: "",
    content: "",
    modified: false,
    saving: false,
    preview: ""
  },
  mutations : {
    changePreviewStyle(state, style) {
      state.style = style;
      state.styleSheet = `${style}.css`;
    },
    updateMarkdown(state, value) {
      state.content = value;
      state.modified = true;

      let markdown = md({html: true, linkify: true}).render(value);

      state.preview = markdown
        .split("~page")
        .map(page => `<div class="page">${page}</div>`)
        .join("");
    },
    resetApplication(state) {
      state.path = "";
      state.content = "";
      state.modified = false;
      state.saving = false;
    }
  },
  actions : {
    openMarkdown({
      state,
      rootState,
      commit
    }, path) {
      if (path) {
        state.path = path;
      }
      rootState
        .dropbox
        .dbx
        .filesDownload({path: state.path})
        .then(response => {
          var reader = new FileReader();
          reader.addEventListener("loadend", () => {
            commit("updateMarkdown", reader.result);
            commit("toggleDropbox", false);
          });
          reader.readAsText(response.fileBlob);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    revertMarkdown({dispatch}) {
      dispatch("openMarkdown");
    },
    saveMarkdown({state, rootState}) {
      state.saving = true;
      state.modified = false;
      rootState
        .dropbox
        .dbx
        .filesUpload({
          path: state.path,
          contents: state.content,
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
