import Vue from "vue";
import Vuex from "vuex";

import content from "./content"
import dropbox from "./dropbox"
import file from "./file"

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    content,
    dropbox,
    file
  }
});

export default store;
