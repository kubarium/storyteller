import jsPDF from "jspdf";

export default {
  state: {
    styles: [
      {
        name: "default",
        active: true
      },
      {
        name: "kubar",
        active: false
      }
    ],
    sizes: [
      {
        name: "Letter Portrait",
        code: "letter-portrait",
        active: true
      },
      {
        name: "A4 Portrait",
        code: "a4-portrait",
        active: false
      },
      {
        name: "Letter Landscape",
        code: "letter-landscape",
        active: false
      },
      {
        name: "A4 Landscape",
        code: "a4-landscape",
        active: false
      }
    ]
  },
  getters: {
    activeStyle: state =>
      state.styles.find(style => style.active === true).name,
    activeSize: state => state.sizes.find(size => size.active === true).code,
    print: (state, getters, rootState) => {
      return `
          <html>
                      <head>
                        <link
      href="${process.env.BASE_URL}styles/${getters.activeStyle}.css"
      rel="stylesheet"
    />
                      </head>
                      <body>ipimle kusagim
        ${rootState.markdown.preview}                        
                      </body>
                    </html>
          `;
    }
  },
  mutations: {},
  actions: {
    applyStyle({ state }, newStyle) {
      state.styles.find(style => style.active === true).active = false;
      state.styles.find(style => style.name === newStyle).active = true;
    },
    applySize({ state }, newSize) {
      state.sizes.find(size => size.active === true).active = false;
      state.sizes.find(size => size.code === newSize).active = true;
    },
    publishMarkdown({ rootState }) {
      document.getElementById("print").contentWindow.print();
      //console.log(printIframe)
    }
    /* publishMarkdown({ rootState }) {
      var doc = new jsPDF({ orientation: "p", unit: "mm", format: "letter" });
      doc.setProperties({
        title: "Fucking Awesome",
        subject: "A fucking documnet"
      });
      const margins = {
        top: 25,
        bottom: 10,
        left: 25,
        width: 165
      };
      var html = rootState.markdown.preview;

      doc.fromHTML(
        html,
        margins.left,
        margins.top,
        { pageSplit: true, width: margins.width },
        () => {
          var date = new Date();
          doc.save(`fuck.pdf`);
        },
        margins
      );
    } */
  }
};
