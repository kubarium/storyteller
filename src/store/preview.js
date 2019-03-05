export default {
    state : {
        styles: [
            {
                name: "default",
                active: true
            }, {
                name: "kubar",
                active: false
            }
        ]
    },
    getters : {
        activeStyle: (state) => state
            .styles
            .find(style => style.active === true)
            .name

    },
    mutations : {},
    actions : {
        applyStyle({
            state
        }, newStyle) {
            state
                .styles
                .find(style => style.active === true)
                .active = false;
            state
                .styles
                .find(style => style.name === newStyle)
                .active = true;
        }
    }
};
