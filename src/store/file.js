import md from "markdown-it";
import Dropbox from "dropbox";
export default {
  state: {
    dbx: null,
    markdown: {
      path: "",
      content: "",
      modified: false,
      saving: false
    },
    preview: "",
    style: "default",
    styleSheet: "default.css"
  },
  mutations: {
    changePreviewStyle(state, style) {
      state.style = style;
      state.styleSheet = `${style}.css`;
    },
    openMarkdown(state, path) {
      state.markdown.path = path;
    },
    updateMarkdown(state, value) {
      state.markdown.content = value;
      state.markdown.modified = true;

      let markdown = md({ html: true, linkify: true }).render(value);

      state.preview = markdown
        .split("~page")
        .map(page => `<div class="page">${page}</div>`)
        .join("");
    }
  },
  actions: {
    connectDropbox({ state }) {
      return new Promise(resolve => {
        state.dbx = new Dropbox.Dropbox({ accessToken: process.env.VUE_APP_DROPBOX_ACCESS_TOKEN });
        resolve();
      });
    },
    saveMarkdown({ state }) {
      state.markdown.saving = true;
      state.markdown.modified = false;
      state.dbx
        .filesUpload({
          path: state.markdown.path,
          contents: state.markdown.content,
          mode: {
            ".tag": "overwrite"
          },
          autorename: true
        })
        .then(metadata => console.log(metadata))
        .catch(console.error);
    }
  }
};
