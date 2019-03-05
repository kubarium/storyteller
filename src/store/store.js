import Vue from "vue";
import Vuex from "vuex";

import codemirror from "./codemirror"
import dropbox from "./dropbox"
import markdown from "./markdown"
import preview from './preview';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    codemirror,
    dropbox,
    markdown,
    preview
  }
});

export default store;
