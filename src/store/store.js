import Vue from "vue";
import Vuex from "vuex";

//import cloudinary from "./cloudinary";
import codemirror from "./codemirror";
import dropbox from "./dropbox";
import imageSelector from "./imageSelector";
import imageSettings from "./imageSettings";
import markdown from "./markdown";
import preview from "./preview";
import settings from "./settings";
import thesaurus from "./thesaurus";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    //cloudinary,
    codemirror,
    dropbox,
    imageSelector,
    imageSettings,
    markdown,
    preview,
    settings,
    thesaurus
  }
});

export default store;
