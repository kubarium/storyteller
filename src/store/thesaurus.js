import axios from "axios";

const mode = {
  XML: "xml",
  JSON: "json"
};

export default {
  state : {
    dialog: false,
    mode: mode.JSON,
    urls: {
      thesaurus: {
        xml: `https://www.dictionaryapi.com/api/v1/references/thesaurus/xml/`,
        json: `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/`
      }
    },
    word: "",
    entries: [],
    api_key: process.env.VUE_APP_DICTIONARYCOM_THESAURUS_API_KEY
  },
  getters : {},
  mutations : {

    updateThesaurus(state, thesaurus) {
      state.entries = thesaurus;
    },
    toggleThesaurus(state, toggle) {
      state.dialog = toggle;
    }
  },
  actions : {
    getThesaurus({
      state,
      commit
    }, word) {
      state.word = word;
      return axios(`${state.urls.thesaurus[state.mode]}${word}?key=${state.api_key}`).then(response => {
        let entries = response
          .data
          .filter(entry => entry.hwi.hw === word);

        let thesaurus = entries.map(entry => {
          let fl = entry.fl;
          let synonyms = entry
            .meta
            .syns
            .flat();
          let antonyms = entry
            .meta
            .ants
            .flat();
          let related = entry
            .def[0]
            .sseq[0]
            .flat()[1]
            .rel_list

          return {fl, synonyms, antonyms, related}
        })

        commit("updateThesaurus", thesaurus);
        commit("toggleThesaurus", true);
      });
    }
  }
};
