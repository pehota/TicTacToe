var AmpersandModel = require("ampersand-model");


module.exports = AmpersandModel.extend({
    type: "game_result",
    
    props: {
        winner: ["any", false]
    },

    session: {
        game: ["any", true, null]        
    },

    derived: {
        hasResult: {
            deps: ["isTie", "winner"],
            fn: function () {
                return this.isTie || !!this.winner;
            }
        },
        isTie: {
            deps: ["winner"],
            fn: function () {
                return this.winner === null;
            }
        }
    }
});
