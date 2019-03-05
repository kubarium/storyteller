import * as operations from "./operations";

export default {
    state : {
        codemirror: null,
        cursorPosition: {
            line: 0,
            ch: 0
        },
        //operations: { ...operations }
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
                .scrollIntoView(pages.pos.from, 300)

        }
    },
    actions : {

        applyOperation({
            state
        }, operation) {
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
