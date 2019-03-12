import * as operations from "./operations";
import {initialValue} from "./initialValue";

export default {
    state : {
        initialValue: initialValue,
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
            window
                .codemirror
                .setOption('lineWrapping', state.lineWrapping);
        },
        registerCodeMirror(state, codemirror) {
            window.codemirror = codemirror
        },
        updatePreviewPagination(state, pagination) {

            let pages = window
                .codemirror
                .getSearchCursor(/~page/gm);
            while (pagination--) {
                pages.findNext()
            }

            window
                .codemirror
                .scrollIntoView({
                    from: pages.pos.from,
                    to: pages.pos.to
                }, 300)

        }
    },
    actions : {
        addImage({

            rootState,
            commit
        }, path) {
            rootState
                .dropbox
                .dbx
                .filesGetTemporaryLink({path})
                .then(file => {
                    window
                        .codemirror
                        .getDoc()
                        .replaceRange(`${operations["addImage"](file.link)}`, window.codemirror.getCursor())
                    commit("toggleDropbox", {toggle: false});

                })

        },
        applyOperation({

            commit
        }, operation) {
            if (operation === "addImage") {
                commit("toggleDropbox", {
                    toggle: true,
                    mode: 'image'
                });
                return
            } else {

                window
                    .codemirror
                    .getDoc()
                    .replaceRange(`\n${operations[operation]}\n`, window.codemirror.getCursor());
                window
                    .codemirror
                    .focus();
                window
                    .codemirror
                    .scrollIntoView(window.codemirror.getCursor());
            }
        }
    }
};
