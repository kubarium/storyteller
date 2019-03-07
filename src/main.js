import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

window.addEventListener("keydown", event => {
  if (event.ctrlKey || event.metaKey) {
    console.log(event);
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
        store.commit("toggleDropbox", true);
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
