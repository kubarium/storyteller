export default {
  state: {
    dialog: false,
    url: "",
    styles: {
      width: "",
      height: "",
      position: "",
      top: "",
      left: "",
      bottom: "",
      right: "",
      "mix-blend-mode": "screen"
    }

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
    toggleImageSettings(state, toggle) {
      state.dialog = toggle;
    },
    /* toggleImageSelector(state, toggle) {
      state.selector.dialog = toggle;
    }, */
    updateSettings(state, setting) {
      state[setting.key] = setting.value;
    }
  },
  actions: {
    getImageSettings({ state, commit }, img) {
      const url = RegExp(/src="(.*?)"/).exec(img)[1];
      console.log(url);
      commit("updateSettings", { key: "url", value: url });
      const style = RegExp(/style="(.*?)"/).exec(img)[1];

      //state.settings;
    }
  }
};
