import * as operations from "./operations";
import { initialValue } from "./initialValue";

export default {
  state: {
    initialValue: initialValue,
    lineWrapping: true
  },
  getters: {
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
  mutations: {
    toggleLineWrapping(state) {
      state.lineWrapping = !state.lineWrapping;
      window.codemirror.setOption("lineWrapping", state.lineWrapping);
    },
    registerCodeMirror(state, codemirror) {
      window.codemirror = codemirror;
    },
    updatePreviewPagination(state, pagination) {
      let pages = window.codemirror.getSearchCursor(/~page/gm);
      while (pagination--) {
        pages.findNext();
      }

      window.codemirror.focus();
      window.codemirror.setCursor(pages.pos.from.line, 0);
      window.codemirror.scrollTo(0, window.codemirror.cursorCoords({ line: pages.pos.from.line, ch: 0 }, "local").top);
    }
  },
  actions: {
    addImage({ rootState, commit }, path) {
      console.log("FUCK ME?");
      window.codemirror.getDoc().replaceRange(`${operations["addImage"](path)}`, window.codemirror.getCursor());

      /* rootState.dropbox.dbx.filesGetTemporaryLink({ path }).then(file => {
        window.codemirror.getDoc().replaceRange(`${operations["addImage"](file.link)}`, window.codemirror.getCursor());
        commit("toggleDropbox", { toggle: false });
      }); */
    },
    applyOperation({ commit }, operation) {
      if (operation === "addImage") {
        window.ml.show();

        /* commit("toggleDropbox", {
          toggle: true,
          mode: "image"
        }); */
        return;
      } else {
        window.codemirror.getDoc().replaceRange(`\n${operations[operation]}\n`, window.codemirror.getCursor());
        window.codemirror.focus();
        window.codemirror.scrollIntoView(window.codemirror.getCursor());
      }
    }
  }
};
