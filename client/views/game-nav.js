var app = require("ampersand-app");
var View = require("./base");
var templates = require("../templates");

module.exports = View.extend({
    template: templates.includes.gamenav,

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
        app.navigate("/");
        this.model.reset();
    }
});