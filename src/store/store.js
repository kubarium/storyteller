import Vue from "vue";
import Vuex from "vuex";

import codemirror from "./codemirror";
import dropbox from "./dropbox";
import imageSettings from "./imageSettings";
import markdown from "./markdown";
import preview from "./preview";
import settings from "./settings";
import thesaurus from "./thesaurus";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    codemirror,
    dropbox,
    imageSettings,
    markdown,
    preview,
    settings,
    thesaurus
  }
});

export default store;
