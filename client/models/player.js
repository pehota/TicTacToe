var AmpersandModel = require("ampersand-model");


module.exports = AmpersandModel.extend({
    type: "player",

    props: {
        name: ["string", true, ""],
        sign: ["string", true, ""]
    },

    session: {
        active: ["boolean", true, false]
    }
});