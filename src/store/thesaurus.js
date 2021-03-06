import axios from "axios";

const mode = {
  XML: "xml",
  JSON: "json"
};

export default {
  state: {
    dialog: false,
    mode: mode.JSON,
    urls: {
      thesaurus: {
        xml: `https://www.dictionaryapi.com/api/v1/references/thesaurus/xml/`,
        json: `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/`
      }
    },
    word: "",
    entries: []
  },
  getters: {},
  mutations: {
    updateThesaurus(state, thesaurus) {
      state.entries = thesaurus;
    },
    toggleThesaurus(state, toggle) {
      state.dialog = toggle;
    }
  },
  actions: {
    getThesaurus({ state, rootState, commit }, word) {
      state.word = word;

      const api_key = rootState.settings.thesaurusAPIKey;

      axios(`${state.urls.thesaurus[state.mode]}${word}?key=${api_key}`).then(response => {
        //window.entries = response.data;

        if (!Array.isArray(response.data)) return alert("You may want to check settings for Thesaurus API!");

        let entries = response.data;
        //.filter(entry => entry.hwi && entry.hwi.hw === word);

        let thesaurus = [];

        if (entries && entries.length && entries[0].fl) {
          thesaurus = entries.map(entry => {
            let fl = entry.fl;
            let synonyms = entry.meta.syns;

            let antonyms = entry.meta.ants;

            let related = entry.def[0].sseq
              .map(sseq => sseq.flat())
              .map(sseq => sseq[1])
              .filter(sseq => sseq.rel_list)
              .map(sseq => sseq.rel_list)
              .map(rel => rel.map(rel => rel.flat().map(rel => rel.wd)));

            let near = entry.def[0].sseq
              .map(sseq => sseq.flat())
              .map(sseq => sseq[1])
              .filter(sseq => sseq.near_list)
              .map(sseq => sseq.near_list)
              .map(near => near.map(near => near.flat().map(near => near.wd)));
            return { fl, synonyms, antonyms, related, near };
          });
        }

        commit("updateThesaurus", thesaurus);
        commit("toggleThesaurus", true);
      });
    }
  }
};
