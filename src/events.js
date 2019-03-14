import store from "./store/store";

window.addEventListener("keydown", event => {
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case "p":
        event.preventDefault();
        store.dispatch("publishMarkdown", false);
        break;
      case "s":
        event.preventDefault();
        store.dispatch("saveMarkdown");
        break;
      case "o":
        event.preventDefault();
        store.commit("toggleDropbox", {
          toggle: true,
          mode: "markdown"
        });
        break;
      case "F12":
        event.preventDefault();
        store.dispatch("revertMarkdown");
        break;
      default:
        break;
    }
  }
});
