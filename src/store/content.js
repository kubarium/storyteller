export default {
    state : {},
    getters : {
        operations: (state) => (type) => {
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
                    ]
                case "layout":
                    return ["Page Break", "Column Break", "Wide Content", "Vertical Space", "Cover Page"]
                case "table":
                    return ["Wide Class Table", "Class Table", "Table", "Wide Table", "Compact Tables"]
                default:
                    break;
            }
        }
    },
    mutations : {
        addPageBreak(state) {
            state.markdown.content = "asd";
        }
    },
    actions : {}
};