import {addPageBreak} from "./utils"
import {Promise} from "q";

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
    mutations : {},
    actions : {
        addPageBreak({commit, rootState}) {
            return new Promise(res => {

                //this is force updating the source textarea with the injected content
                var textarea = document.getElementById("source");

                var startPos = textarea.selectionStart;
                var endPos = textarea.selectionEnd;
                var currentValue = rootState.file.markdown.content;
                var injected = addPageBreak;
                if (textarea.selectionStart || textarea.selectionStart == "0") {
                    commit("updateMarkdown", currentValue.substring(0, startPos) + injected + currentValue.substring(endPos, currentValue.length))
                } else {
                    //if there is a selection, ignore it and append content
                    commit("updateMarkdown", rootState.file.markdown.content + injected);
                }
                // expose the new cursor position
                res(startPos + injected.length);
            })

        }
    }
};