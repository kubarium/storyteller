import axios from "axios";

export default {
  state : {
    urls: {
      thesaurus: `https://www.dictionaryapi.com/api/v1/references/thesaurus/xml/`
    },
    api_key: process.env.VUE_APP_DICTIONARYCOM_THESAURUS_API_KEY
  },
  getters : {},
  mutations : {},
  actions : {
    getThesaurus({
      state
    }, word) {
      return axios(`${state.urls.thesaurus}cool?key=${state.api_key}`).then(response => {
        var data = new DOMParser().parseFromString(response.data, "application/xml");

        console.log(data)
      })
    }
  }
};
