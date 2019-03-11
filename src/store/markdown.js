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
      commit,
      dispatch
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
            rootState
              .codemirror
              .setValue(reader.result);
            dispatch("updatePreview");
            commit("toggleDropbox", {toggle: false});
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
        .then(metadata => {
          state.saving = false;
          console.log(metadata);
        })
        .catch(console.error);
    }
  }
};
