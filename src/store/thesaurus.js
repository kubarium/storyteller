import axios from "axios";

const mode = {
  XML: "xml",
  JSON: "json"
};

export default {
  state: {
    mode: mode.XML,
    urls: {
      thesaurus: {
        xml: `https://www.dictionaryapi.com/api/v1/references/thesaurus/xml/`,
        json: `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/`
      }
    },
    api_key: process.env.VUE_APP_DICTIONARYCOM_THESAURUS_API_KEY
  },
  getters: {},
  mutations: {},
  actions: {
    getThesaurus({ state }, word) {
      return axios(
        `${state.urls.thesaurus[state.mode]}${word}?key=${state.api_key}`
      ).then(response => {
        var data;
        if (state.mode === mode.XML) {
          data = new DOMParser().parseFromString(
            response.data,
            `application/xml`
          );
        } else {
          data = response.data;
        }
        window.sik = data;

        //console.log(data);
        //console.table(data);
      });
    }
  }
};
