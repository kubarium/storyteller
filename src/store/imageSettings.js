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
      "mix-blend-mode": "",
      transform: "rotateZ(90deg)"
    }
  },
  getters: {
    image: state => {
      let styles = Object.entries(state.styles)
        .filter(entry => entry[1] !== "")
        .map(entry => entry.join(":"))
        .join(";");

      return `<img src="${state.url}" style="${styles}"/>`;
    },

    imageWidth: state => (state.styles.width && RegExp(/\d+/, "g").exec(state.styles.width)[0]) || "",
    imageWidthUnit: state => state.styles.width.split(RegExp(/\d+/, "g"))[1] || "px",

    imageHeight: state => (state.styles.height && RegExp(/\d+/, "g").exec(state.styles.height)[0]) || "",
    imageHeightUnit: state => state.styles.height.split(RegExp(/\d+/, "g"))[1] || "px",

    imagePositionLeft: state => (state.styles.left && RegExp(/\d+/, "g").exec(state.styles.left)[0]) || "",
    imagePositionLeftUnit: state => state.styles.left.split(RegExp(/\d+/, "g"))[1] || "px",

    imagePositionRight: state => (state.styles.right && RegExp(/\d+/, "g").exec(state.styles.right)[0]) || "",
    imagePositionRightUnit: state => state.styles.right.split(RegExp(/\d+/, "g"))[1] || "px",

    imagePositionTop: state => (state.styles.top && RegExp(/\d+/, "g").exec(state.styles.top)[0]) || "",
    imagePositionTopUnit: state => state.styles.top.split(RegExp(/\d+/, "g"))[1] || "px",

    imagePositionBottom: state => (state.styles.bottom && RegExp(/\d+/, "g").exec(state.styles.bottom)[0]) || "",
    imagePositionBottomUnit: state => state.styles.bottom.split(RegExp(/\d+/, "g"))[1] || "px",

    imageRotation: state => state.styles.transform && RegExp(/\d+/, "").exec(state.styles.transform)[0]
  },
  mutations: {
    toggleImageSettings(state, toggle) {
      state.dialog = toggle;
    },
    updateStyles(state, styles) {
      state.styles = Object.assign({}, state.styles, styles);
    }
  },
  actions: {
    updateStyles({ state }, style) {
      return new Promise(resolve => {
        state.styles[style.key] = style.value;
        resolve();
      });
    },
    updateRotation({ state }, degree) {
      return new Promise(resolve => {
        state.styles.transform = `rotateZ(${degree}deg)`;
        resolve();
      });
    },
    updateURL({ state }, url) {
      return new Promise(resolve => {
        state.url = url;
        resolve();
      });
    },
    getImageSettings({ commit, dispatch }, img) {
      const url = RegExp(/src="(.*?)"/).exec(img)[1];

      dispatch("updateURL", url);

      const styles = RegExp(/style="(.*?)"/)
        .exec(img)[1]
        .replace(RegExp(/ /, "g"), "")
        .split(";")
        .reduce((result, item) => {
          const entry = item.split(":");

          result[entry[0]] = entry[1];
          return result;
        }, {});
      commit("updateStyles", styles);
    }
  }
};
