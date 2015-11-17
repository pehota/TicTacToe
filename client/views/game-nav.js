var app = require("ampersand-app");
var View = require("./base");
var templates = require("../templates");

module.exports = View.extend({
    template: templates.includes.gamenav,

    bindings: {
        "model.ready": {
            hook: "game-reset",
            type: "toggle"
        }
    },

    events: {
        "click [data-hook=game-reset]": "resetGame"
    },

    /**
     * Description
     * @param    {type}    name - description
     * @return   {type}    description
     */
    resetGame: function(ev) {
        ev.preventDefault();
        this.model.reset();
    }
});