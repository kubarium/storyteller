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
            console.log(process.env.NODE_ENV)
            commit("updateDropboxAccessToken", (settings && settings.dropboxAccessToken))
            commit("updateThesaurusAPIKey", (settings && settings.thesaurusAPIKey))

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