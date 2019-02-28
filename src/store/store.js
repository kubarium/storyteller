import Vue from "vue";
import Vuex from "vuex";

import content from "./content"
import file from "./file"

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    content,
    file
  }
});

export default store;
