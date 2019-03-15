import md from "markdown-it";
export default {
  state : {
    content: "",
    fullscreen: false,
    styles: [
      {
        name: "5E",
        active: true
      }, {
        name: "metal",
        active: false
      }
    ],
    sizes: [
      {
        name: "Letter Portrait",
        code: "letter-portrait",
        orientation: "portrait",
        active: true
      }, {
        name: "A4 Portrait",
        code: "a4-portrait",
        orientation: "portrait",
        active: false
      }, {
        name: "Letter Landscape",
        code: "letter-landscape",
        orientation: "landscape",
        active: false
      }, {
        name: "A4 Landscape",
        code: "a4-landscape",
        orientation: "landscape",
        active: false
      }
    ],
    styleVersion: 0
  },
  getters : {
    activeStyle: state => state
      .styles
      .find(style => style.active === true)
      .name,
    activeOrientation: state => state
      .sizes
      .find(size => size.active === true)
      .orientation,
    activeSize: state => state
      .sizes
      .find(size => size.active === true)
      .code
  },
  mutations : {
    toggleFullscreen(state) {
      state.fullscreen = !state.fullscreen;
      state.fullscreen
        ? document
          .body
          .requestFullscreen()
        : document.exitFullscreen();
    }
  },
  actions : {
    updatePreview({state, rootState}) {
      return new Promise(res => {

        if (rootState.markdown.path) {
          rootState.markdown.modified = true;
        }

        let markdown = md({html: true, linkify: true}).render(window.codemirror.getValue());

        let autoPageNumber = `<div class='pageNumber auto'></div>`;

        state.content = markdown
          .split("~page")
          .map(page => `<div class="page">${page}${autoPageNumber}</div>`)
          .join("");

        res();
      })
    },
    applyStyle({
      state
    }, newStyle) {
      state.styleVersion = Math.random();
      state
        .styles
        .find(style => style.active === true)
        .active = false;
      state
        .styles
        .find(style => style.name === newStyle)
        .active = true;
    },
    applySize({
      state
    }, newSize) {
      state
        .sizes
        .find(size => size.active === true)
        .active = false;
      state
        .sizes
        .find(size => size.code === newSize)
        .active = true;
    },
    publishMarkdown({
      state,
      rootState,
      getters
    }, inkFriendly) {
      var iframe = document.createElement("iframe");
      ["width", "height", "right", "bottom", "border"].forEach(prop => (iframe.style[prop] = 0));
      iframe.style.position = "fixed";
      iframe.onload = () => {
        //clean up after
        iframe.contentWindow.onafterprint = iframe.contentWindow.onbeforeunload = () => document
          .body
          .removeChild(iframe);

        iframe
          .contentWindow
          .print();
      };

      //ready, go!
      iframe.srcdoc = `
        <html>
          <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
            <link href="${process.env.BASE_URL}styles/${getters.activeStyle}/${
      getters.activeStyle}.css?v=${state.styleVersion}" rel="stylesheet"/>
          </head>
          <body class="pages ${getters.activeSize} ${
      inkFriendly
        ? "inkFriendly"
        : "showNoMercy"}">
            ${rootState.markdown.preview}
          </body>
        </html>
      `;

      document
        .body
        .appendChild(iframe);
    }
  }
};
