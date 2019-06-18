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
    registerCodeMirror(_, codemirror) {
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
    addImage(_, path) {
      window.codemirror.getDoc().replaceRange(`${operations["addImage"](path)}`, window.codemirror.getCursor());
    },
    applyOperation(_, operation) {
      if (operation === "addImage") {
        window.ml.show();
      } else {
        window.codemirror.getDoc().replaceRange(`\n${operations[operation]}\n`, window.codemirror.getCursor());
        window.codemirror.focus();
        window.codemirror.scrollIntoView(window.codemirror.getCursor());
      }
    }
  }
};
