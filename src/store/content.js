import * as operations from "./operations";

export default {
  state: {
    codemirror: null,
    cursorPosition: {
      line: 0,
      ch: 0
    }
    //operations: { ...operations }
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
    registerCodeMirror(state, codemirror) {
      state.codemirror = codemirror;
    },
    updateCursor(state, cursorPosition) {
      state.cursorPosition = cursorPosition;
    }
  },
  actions: {
    applyOperation({ state }, operation) {
      state.codemirror.getDoc().replaceRange(`\n${operations[operation]}\n`, state.codemirror.getCursor());
      state.codemirror.focus();
      state.codemirror.scrollIntoView(state.cursorPosition);
    }
  }
};
