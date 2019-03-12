import axios from "axios";

export default {
  state: {
    urls: {
      thesaurus: `https://od-api.oxforddictionaries.com/api/v1/entries/en/`
    },
    options: {
      /*
      method: "GET",
      mode: "no-cors",
      credentials: "same-origin",
      */
      withCredentials: false,
      crossdomain: false,
      headers: {
        /*
         */
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain, */*",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Credentials": true,
        app_id: process.env.VUE_APP_OXFORD_DICTIONARY_APP_ID,
        app_key: process.env.VUE_APP_OXFORD_DICTIONARY_APP_KEY
      }
    }
  },
  getters: {},
  mutations: {},
  actions: {
    getThesaurus({ state }, word) {
      return axios
        .get(`${state.urls.thesaurus}${word}/synonyms;antonyms`, state.options)
        .then(data => {
          var senses = data.results[0].lexicalEntries
            .map(le => le.entries[0].senses)
            .flat();
          var synonyms = senses
            .map(sense => sense.synonyms)
            .flat()
            .filter(subsense => subsense);
          var antonyms = senses
            .map(sense => sense.antonyms)
            .flat()
            .filter(subsense => subsense);

          var subsenses = senses
            .map(sense => sense.subsenses)
            .flat()
            .filter(subsense => subsense);
          var subsensicalSynonyms = subsenses
            .map(subsense => subsense.synonyms)
            .flat()
            .filter(subsense => subsense);
          var subsensicalAntonyms = subsenses
            .map(subsense => subsense.antonyms)
            .flat()
            .filter(subsense => subsense);

          return {
            synonyms: synonyms.concat(subsensicalSynonyms),
            antonyms: antonyms.concat(subsensicalAntonyms)
          };
        });
    }
  }
};
