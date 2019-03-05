import Dropbox from "dropbox";

export default {
  state: {
    dialog: false,
    path: "",
    dbx: null,
    entries: null,
    fetching: false,
    breadcrumbs: []
  },
  getters: {
    isFolder: () => entry => {
      return entry[".tag"] === "folder";
    },
    isParent: () => entry => {
      return entry[".tag"] === "parent";
    },
    isMarkdown: () => entry => {
      return RegExp(/\.(.*?)$/).exec(entry.name)[1] === "md";
    },
    isRoot: state => {
      return state.path === "";
    }
  },
  mutations: {
    toggleDropbox(state, toggle) {
      state.dialog = toggle;
    },
    crumble(state, path) {
      let pathToCrumble = "root".concat(path);
      const breadcrumbsPath = pathToCrumble.split("/").reduce((a, b, index) => {
        return index > 0 ? a.concat(`${a[index - 1]}/${b}`) : a.concat("");
      }, []);
      state.breadcrumbs = pathToCrumble.split("/").map((path, index) => {
        return {
          ".tag": "parent",
          text: path,
          path_lower: breadcrumbsPath[index]
        };
      });
    }
  },
  actions: {
    connectDropbox({ state }) {
      return new Promise(resolve => {
        state.dbx = new Dropbox.Dropbox({
          accessToken: process.env.VUE_APP_DROPBOX_ACCESS_TOKEN
        });
        resolve();
      });
    },

    refreshEntries({ dispatch, state }) {
      dispatch("getEntries", state.path);
    },
    deleteFromDropbox({ state, rootState, commit }, path) {
      if (path) {
        state.dbx.filesDelete({ path: path });
      } else {
        state.dbx
          .filesDelete({ path: rootState.markdown.path })
          .then(() => commit("resetApplication"));
      }
    },
    getEntries({ state, rootState, commit, dispatch }, path) {
      rootState.markdown.path = path;

      commit("crumble", path);

      state.fetching = true;

      state.dbx
        .filesListFolder({ path })
        .then(response => dispatch("fileTree", response.entries))
        .catch(error => console.error(error));
    },
    fileTree({ state, rootState, getters }, entries) {
      state.entries = entries.filter(entry => {
        if (getters.isFolder(entry)) {
          return true;
        }
        if (getters.isMarkdown(entry)) {
          return true;
        }
        return false;
      });

      if (!getters.isRoot) {
        state.entries.unshift({
          name: `Go up`,
          ".tag": "parent",
          path_lower: rootState.markdown.path.replace(RegExp(/\/[\w ]*$/g), "")
        });
      }

      state.fetching = false;
    }
  }
};
