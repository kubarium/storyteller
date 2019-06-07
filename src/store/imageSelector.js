export default {
  state: {
    dialog: false

    /* mode: mode.MARKDOWN,
        sort: sort.NAME,
        path: "",
        dbx: null,
        entries: null,
        fetching: false,
        filter: "",
        breadcrumbs: [] */
  },
  mutations: {
    toggleImageSelector(state, toggle) {
      state.dialog = toggle;
    }
  },
  actions: {
    /* getImageSettings({ state, commit }, img) {
      const url = RegExp(/src="(.*?)"/).exec(img)[0];
      console.log(url);
      commit("updateSettings", { key: "url", value: url });
      const style = RegExp(/style="(.*?)"/).exec(img)[0];

      //state.settings;
    } */
  }
};
