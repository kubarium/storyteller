export default {
  state : {
    path: "",
    modified: false,
    saving: false
  },
  getters : {
    isMarkdownOpen: (state) => state.path != ""
  },
  mutations : {
    resetApplication(state) {
      window
        .codemirror
        .setValue("")
      state.path = "";
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
          contents: window
            .codemirror
            .getValue(),
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
