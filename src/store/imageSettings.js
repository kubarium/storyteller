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
  getters: {
    imageWidth: state => (state.styles.width && RegExp(/\d+/, "g").exec(state.styles.width)[0]) || "",
    imageHeight: state => (state.styles.height && RegExp(/\d+/, "g").exec(state.styles.height)[0]) || "",
    imageWidthUnit: state => state.styles.width.split(RegExp(/\d+/, "g"))[1] || "px",
    imageHeightUnit: state => state.styles.height.split(RegExp(/\d+/, "g"))[1] || "px",

    imagePositionLeft: state => (state.styles.left && RegExp(/\d+/, "g").exec(state.styles.left)[0]) || "",
    imagePositionLeftUnit: state => state.styles.left.split(RegExp(/\d+/, "g"))[1] || "px",

    imagePositionRight: state => (state.styles.right && RegExp(/\d+/, "g").exec(state.styles.right)[0]) || "",
    imagePositionRightUnit: state => state.styles.right.split(RegExp(/\d+/, "g"))[1] || "px",

    imagePositionTop: state => (state.styles.top && RegExp(/\d+/, "g").exec(state.styles.top)[0]) || "",
    imagePositionTopUnit: state => state.styles.top.split(RegExp(/\d+/, "g"))[1] || "px",

    imagePositionBottom: state => (state.styles.bottom && RegExp(/\d+/, "g").exec(state.styles.bottom)[0]) || "",
    imagePositionBottomUnit: state => state.styles.bottom.split(RegExp(/\d+/, "g"))[1] || "px"
  },
  mutations: {
    toggleImageSettings(state, toggle) {
      state.dialog = toggle;
    },
    updateStyles(state, styles) {
      console.log(Object.assign({}, state.styles, styles));
      state.styles = Object.assign({}, state.styles, styles);
      //[style.key] = style.value;
    },
    updateSettings(state, setting) {
      state[setting.key] = setting.value;
    }
  },
  actions: {
    getImageSettings({ commit }, img) {
      const url = RegExp(/src="(.*?)"/).exec(img)[1];
      console.log(url);
      commit("updateSettings", { key: "url", value: url });
      const styles = RegExp(/style="(.*?)"/)
        .exec(img)[1]
        .replace(RegExp(/ /, "g"), "")
        .split(";");

      let delir = styles.reduce((result, item) => {
        const entry = item.split(":");

        result[entry[0]] = entry[1];
        return result;
      }, {});
      commit("updateStyles", delir);
      //commit("updateStyles", { key: "url", value: url });

      //state.settings;
    }
  }
};
