export default {
    state : {
        entries: null,
        fetching: false,
        breadcrumbs: []
    },
    getters : {
        isFolder: () => (entry) => {
            return entry[".tag"] === "folder";
        },
        isParent: () => (entry) => {
            return entry[".tag"] === "parent";
        },
        isMarkdown: () => (entry) => {
            return RegExp(/\.(.*?)$/).exec(entry.name)[1] === "md";
        },
        isRoot: (state, getters, rootState) => {
            return rootState.file.markdown.path === "";
        }
    },
    mutations : {
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
        }
    },
    actions : {

        refreshEntries({dispatch, rootState}) {
            dispatch("getEntries", rootState.file.markdown.path);
        },
        getEntries({
            state,
            rootState,
            commit,
            dispatch
        }, path) {
            rootState.file.markdown.path = path;

            commit("crumble", path);

            state.fetching = true;

            rootState
                .file
                .dbx
                .filesListFolder({path})
                .then(response => dispatch("fileTree", response.entries))
                .catch(error => console.error(error));
        },
        fileTree({
            state,
            rootState,
            getters
        }, entries) {
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
                state
                    .entries
                    .unshift({
                        name: `Go up`,
                        ".tag": "parent",
                        path_lower: rootState
                            .file
                            .markdown
                            .path
                            .replace(RegExp(/\/[\w ]*$/g), "")
                    });
            }

            state.fetching = false;
        }
    }
}