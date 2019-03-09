import * as operations from "./operations";

export default {
    state : {
        codemirror: null,
        cursorPosition: {
            line: 0,
            ch: 0
        },
        lineWrapping: false
    },
    getters : {
        operations: () => type => {
            switch (type) {
                case "basic":
                    return [
                        "Spell",
                        "Spell List",
                        "Class Features",
                        "Image",
                        "Note",
                        "Description",
                        "Monster Stats",
                        "Wide Monster Stats"
                    ];
                case "layout":
                    return ["Page Break", "Column Break", "Wide Content", "Some Room", "Cover Page"];
                case "table":
                    return ["Wide Class Table", "Class Table", "Table", "Wide Table", "Compact Tables"];
                default:
                    break;
            }
        }
    },
    mutations : {
        toggleLineWrapping(state) {
            state.lineWrapping = !state.lineWrapping;
            state
                .codemirror
                .setOption('lineWrapping', state.lineWrapping);
        },
        registerCodeMirror(state, codemirror) {
            state.codemirror = codemirror;
        },
        updateCursor(state, cursorPosition) {
            state.cursorPosition = cursorPosition;
        },
        updatePreviewPagination(state, pagination) {
            state.pagination = pagination

            let pages = state
                .codemirror
                .getSearchCursor(/~page/gm);
            while (pagination--) {
                pages.findNext()
            }

            state
                .codemirror
                .scrollIntoView({
                    from: pages.pos.from,
                    to: pages.pos.to
                }, 300)

        }
    },
    actions : {
        addImage({
            state,
            rootState,
            commit
        }, path) {
            rootState
                .dropbox
                .dbx
                .filesGetTemporaryLink({path})
                .then(file => {
                    state
                        .codemirror
                        .getDoc()
                        .replaceRange(`${operations["addImage"](file.link)}`, state.codemirror.getCursor())
                    commit("toggleDropbox", {toggle: false});

                })

        },
        applyOperation({
            state,
            commit
        }, operation) {
            if (operation === "addImage") {
                commit("toggleDropbox", {
                    toggle: true,
                    mode: 'image'
                });
                return
            }

            state
                .codemirror
                .getDoc()
                .replaceRange(`\n${operations[operation]}\n`, state.codemirror.getCursor());
            state
                .codemirror
                .focus();
            state
                .codemirror
                .scrollIntoView(state.cursorPosition);
        }
    }
};
