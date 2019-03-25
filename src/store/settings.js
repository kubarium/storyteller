export default {
    state : {
        dialog: true,
        dropboxAccessToken: "",
        thesaurusAPIKey: ""
    },
    mutations : {
        toggleSettings(state, toggle) {
            state.dialog = toggle;
        },
        updateDropboxAccessToken(state, token) {
            state.dropboxAccessToken = token;
        },
        updateThesaurusAPIKey(state, token) {
            state.thesaurusAPIKey = token;
        }
    },
    actions : {
        loadSettings({commit, dispatch}) {
            let settings = JSON.parse(localStorage.getItem("settings"))

            commit("updateDropboxAccessToken", (settings && settings.dropboxAccessToken) || process.env.VUE_APP_DROPBOX_ACCESS_TOKEN)
            commit("updateThesaurusAPIKey", (settings && settings.thesaurusAPIKey) || process.env.VUE_APP_THESAURUS_API_KEY)

            dispatch("saveSettings")
        },
        saveSettings({state}) {
            let settings = {
                dropboxAccessToken: state.dropboxAccessToken,
                thesaurusAPIKey: state.thesaurusAPIKey
            }

            localStorage.setItem("settings", JSON.stringify(settings))
        },
        updateDropboxAccessToken({
            commit,
            dispatch
        }, token) {
            commit("updateDropboxAccessToken", token)
            dispatch("saveSettings");
        },
        updateThesaurusAPIKey({
            commit,
            dispatch
        }, token) {
            commit("updateThesaurusAPIKey", token)
            dispatch("saveSettings");
        }
    }
}