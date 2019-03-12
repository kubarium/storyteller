import Dropbox from "dropbox";

const mode = {
  MARKDOWN: "markdown",
  IMAGE: "image"
}

const sort = {
  NAME: "name",
  DATE: "date"
}

export default {
  state : {
    dialog: false,
    mode: mode.MARKDOWN,
    sort: sort.NAME,
    path: "",
    dbx: null,
    entries: null,
    fetching: false,
    filter: "",
    breadcrumbs: []
  },
  getters : {
    isFolder: () => entry => {
      return entry[".tag"] === "folder";
    },
    isParent: () => entry => {
      return entry[".tag"] === "parent";
    },
    isMarkdown: () => entry => {
      return RegExp(/\.(.*?)$/).exec(entry.name)[1] === "md";
    },
    isImage: () => entry => {
      return ["jpg", "gif", "jpeg", "png"].includes(RegExp(/\.(.*?)$/).exec(entry.name)[1].toLowerCase())
    },
    isRoot: state => {
      return state.path === "";
    }
  },
  mutations : {
    sortDropboxEntries(state, sort) {
      state.sort = sort;
    },
    toggleDropbox(state, {toggle, mode}) {
      state.dialog = toggle;
      state.mode = mode
    },
    crumble(state, path) {
      let pathToCrumble = "root".concat(path);
      const breadcrumbsPath = pathToCrumble
        .split("/")
        .reduce((a, b, index) => {
          return index > 0
            ? a.concat(`${a[index - 1]}/${b}`)
            : a.concat("");
        }, []);
      state.breadcrumbs = pathToCrumble
        .split("/")
        .map((path, index) => {
          return {".tag": "parent", text: path, path_lower: breadcrumbsPath[index]};
        });
    },
    updateFilter(state, filter) {
      state.filter = filter
    }
  },
  actions : {
    connectDropbox({state}) {
      return new Promise(resolve => {
        state.dbx = new Dropbox.Dropbox({accessToken: process.env.VUE_APP_DROPBOX_ACCESS_TOKEN});
        resolve();
      });
    },

    refreshEntries({dispatch, state}) {
      dispatch("getEntries", state.path);
    },
    deleteFromDropbox({
      state,
      rootState,
      commit
    }, path) {
      if (path) {
        state
          .dbx
          .filesDelete({path: path});
      } else {
        state
          .dbx
          .filesDelete({path: rootState.markdown.path})
          .then(() => commit("resetApplication"));
      }
    },
    getEntries({
      state,
      commit,
      dispatch
    }, path) {
      state.path = path;

      commit("crumble", path);

      state.fetching = true;

      state
        .dbx
        .filesListFolder({path, include_media_info: true})
        .then(response => dispatch('filterEntries', response.entries))
        .then(entries => dispatch("fileTree", entries))
        .catch(error => console.error(error));

    },
    filterEntries({
      state,
      commit
    }, entries) {
      return new Promise((res) => {
        if (state.sort === sort.DATE) {
          res(entries.sort((a, b) => {
            return new Date(a) < new Date(b)
              ? 1
              : new Date(a) > new Date(b)
                ? -1
                : 0;
          }))
        } else {
          res(entries.sort((a, b) => a.name > b.name
            ? 1
            : a.name < b.name
              ? -1
              : 0))

        }
      })
    },
    fileTree({
      state,
      getters
    }, entries) {
      state.entries = entries.filter(entry => {
        if (getters.isFolder(entry)) {
          return true;
        }
        if (state.mode === mode.MARKDOWN && getters.isMarkdown(entry)) {
          return true;
        }
        if (state.mode === mode.IMAGE && getters.isImage(entry)) {
          return true;
        }
        return false;
      });

      if (!getters.isRoot) {
        state
          .entries
          .unshift({
            name: `Go up`,
            ".tag": "parent",
            path_lower: state
              .path
              .replace(RegExp(/\/[\w ]*$/g), "")
          });
      }

      state.fetching = false;
    }
  }
};
