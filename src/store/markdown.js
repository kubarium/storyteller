export default {
  state : {
    path: "",
    content: "",
    modified: false,
    saving: false
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
            window
              .codemirror
              .setValue(reader.result);
            dispatch("updatePreview");
            commit("toggleDropbox", {toggle: false});
          });
          reader.readAsText(response.fileBlob);
        })
        .catch(console.error);
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
        .then(() => {
          state.saving = false;
        })
        .catch(console.error);
    }
  }
};
