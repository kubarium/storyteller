import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "./events";

Vue.component("v-style", {
  render: function(createElement) {
    var style = createElement("style", this.$slots.default);
    style.disabled = this.$attrs.disabled;
    return style;
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
